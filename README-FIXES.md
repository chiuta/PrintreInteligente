# Printre inteligențe — Reparații aplicate (v2)

**937 KB → 866 KB (‑9.7%)**, validare HTML curată.

## Reparații aplicate automat

### Fază 1 — Curățenie fișier

| Problemă | Acțiune | Economie |
|---|---|---|
| 8× `<script>` Cloudflare email-decode | Eliminate | — |
| 10× `__cf_email__` + `/cdn-cgi/l/email-protection` | Restaurate la `mailto:alexio@trom.tf` | — |
| 4× blocuri Google Fonts identice (192 `@font-face`) | Redus la 1 (42 `@font-face`) | **~67 KB** |
| 3× `<meta theme-color>` | Redus la 2 (cu `media`) | — |
| 7× JSON-LD cu `Book` duplicat | Redus la 6 (păstrat `@graph`) | ~1.3 KB |
| 29× `style=""` goale | Eliminate | — |
| 1× `translateY(-0.7505px)` runtime hardcodat | Eliminat | — |
| 1× `opacity: 1; transition: opacity 0.4s;` reziduu lazy-load | Eliminat | — |
| 8× `data-ab-click-bound="1"` runtime | Eliminate | — |
| 1× `<i data-reactroot=""></i>` ghost | Eliminat | — |
| 2× `class=""` goale | Eliminate | — |
| **28 KB `<nav>` static suprascris de `buildNav()` la runtime** | Colapsat la `<nav></nav>` gol | **~28 KB** |

### Fază 2 — Corectitudine & semantică

- Script dark-mode în `<head>` — acum respectă `prefers-color-scheme`, cu ora zilei ca fallback
- Cache SW `pi-v10` → `pi-v11` (forțează reload la vizitatori recurenți)
- Adăugat `<meta robots>` cu directive explicite pentru crawleri
- `<nav aria-label="Navigație principală">` — landmark accesibil

### Fază 3 — Accesibilitate

- 208× `<a class="ni">` fără `href` → au primit `tabindex="0" role="button"` (static + în buildNav() templates — 33 template literals patchate)
- Rezultat: nav navigabil cu Tab, anunțat corect de NVDA / VoiceOver

### Fază 4 — Arhitectură API

- 2× `fetch('https://api.anthropic.com/…')` → `fetch(window.PI_API_ENDPOINT, …)`
- Injectat config block la început de `<body>`:
  ```js
  window.PI_API_ENDPOINT = window.PI_API_ENDPOINT || '/api/claude';
  ```
- Worker de proxy furnizat separat (`claude-proxy.worker.js`) cu:
  - CORS whitelist pentru `alexio.tf`
  - Rate-limit 30/oră/IP via KV
  - Validare model + `max_tokens`
  - Injectare `x-api-key` server-side

---

## Pași manuali rămași

### 1. Deploy Worker (obligatoriu pentru GRM/MYE să funcționeze)

Urmează pașii din comentariul de cap al `claude-proxy.worker.js`:
1. Dashboard Cloudflare → Workers & Pages → Create
2. Lipește conținutul, Save & Deploy
3. Settings → Variables → Add Secret `ANTHROPIC_API_KEY`
4. (Recomandat) KV namespace `pi-ratelimit` + binding `RATELIMIT_KV`
5. Zone `alexio.tf` → Workers Routes → `alexio.tf/api/claude` → worker-ul tău

### 2. Cloudflare Dashboard — Email Obfuscation Off

Scrape Shield → Email Address Obfuscation → **Off** pentru zona `alexio.tf`.
Altfel, următoarea salvare din browser re-introduce cele 10 artefacte CF.

### 3. Update `sw.js` static pe server (dacă există)

Dacă ai un `/sw.js` fizic pe server (nu doar blob fallback-ul din index), bumpează
și acolo `'pi-v10'` → `'pi-v11'` și re-deployează.

---

## Nereparate — decizie conștientă, nu bug

### 253 `onclick=` în HTML static (după colapsarea nav-ului)

Sunt pe butoane share, modale, acțiuni de UI — nu în navigație (aceea a fost
colapsată). Refactor-ul la event delegation:
- **Nu e un bug** — funcționează corect
- **Previne doar un CSP strict** (`script-src 'self'`), ceea ce nu ai activat
- **Volum mare de muncă**: ~4-6h manual, cu testare, pentru că multe sunt
  `onclick="func();setTimeout(...)"` cu logică compusă
- **Risc de regresie** pe un fișier de 11.000 linii

Dacă vrei CSP strict la un moment dat, acesta e cel mai mare obstacol rămas.
Altfel, poate aștepta o rescriere arhitecturală (ex. când migrezi la build-step).

### 14 blocuri `<script>` inline ~593 KB

Externalizarea în `.js` separate cu hash în nume ar îmbunătăți TTI și ar
permite cache agresiv. Necesită infrastructură de build (Rollup/esbuild),
ieșire din filozofia „single-file HTML". Păstrat la alegerea ta arhitecturală.

### 2× `<meta viewport>`

A doua e în template-ul A4 print (generat dinamic de `generateA5()`). Legit.

---

## Verificare rapidă post-deploy

```bash
# 1. Emailuri funcționale?
curl -s https://alexio.tf | grep -c 'mailto:alexio@trom.tf'
# Ar trebui: 11

# 2. Artefacte Cloudflare dispărute?
curl -s https://alexio.tf | grep -c '__cf_email__'
# Ar trebui: 0

# 3. Proxy Worker activ?
curl -X POST https://alexio.tf/api/claude \
  -H "Origin: https://alexio.tf" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":50,"messages":[{"role":"user","content":"salut"}]}'
# Ar trebui: 200 OK cu JSON răspuns Claude

# 4. Cache SW bumped?
curl -s https://alexio.tf | grep -c "'pi-v11'"
# Ar trebui: 1 (în fallback blob)
```
