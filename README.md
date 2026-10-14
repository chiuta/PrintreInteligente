# Printre inteligențe

Roman SF interactiv despre misiunea Artemis 2, „recenzat de stele și hipercivilizații", cu audiobook integrat.

**Live:** https://chiuta.github.io/PrintreInteligente/

![Captura de ecran](screenshot.png)

**Versiune:** 1.1.0 · **Ultima actualizare:** 14 octombrie 2026

## Ce este

„Printre inteligențe" este o carte vie, publicată ca aplicație web (un fișier `index.html` mare, plus `sw.js`, `robots.txt`, `sitemap.xml` și imagini de previzualizare). Romanul, inspirat de misiunea Artemis 2 a NASA (zbor de test lunar, încheiat pe 10 aprilie 2026), plasează echipajul într-un scenariu integral ficțional, în care o defecțiune tehnică îi obligă la o aselenizare de urgență. Conform paginii, cartea conține un Prolog, două capitole, un Epilog, 17 scenarii alternative, grupate în 5 familii, și 108 recenzii fictive în 12 categorii (literare, filosofice, ale cititorilor, ale AI din viitor, NHI, hipercivilizații etc.). Pagina declară că este o operă de ficțiune, nu este afiliată NASA sau CSA, și că este o colaborare om-AI, dezvăluită în Epilog.

## Funcții

- Navigare pe secțiuni (meniu lateral): carte, scenarii, recenzii.
- Audiobook integrat, cu sinteză vocală (serviciu online sau vocea locală a browserului), setări de voci și redare.
- Funcții generative „✨ Recenzia ta" și „🚀 Ending-ul tău", care apelează un API de AI printr-un endpoint configurabil (`/api/claude`).
- Căutare, temă zi/noapte, mod de citire, fundaluri și efecte sonore opționale, progres de lectură și semne de carte.
- Traducere automată a paginii, la alegere, într-o listă lungă de limbi (meniul „Traduceri"; limba originală este româna).
- Panou cu scurtături de tastatură (apelat cu `?`).
- Pagini legale în aplicație: confidențialitate/GDPR, cookies, buton „Șterge toate datele locale".
- PWA: manifest și Service Worker (`sw.js`).

## Manual de utilizare

Scurtături afișate de aplicație:

- `← →` pagina anterioară / următoare; `↑ ↓` derulare
- `Esc` închide orice modal sau panou
- `/` sau `Ctrl+F` deschide căutarea
- `H` acasă; `D` comută tema zi/noapte
- `A` deschide audiobook; `Space` play/pauză audiobook
- `?` afișează lista de scurtături

Pași:

1. Citește din meniul lateral: Prolog, Capitolele 1-2, scenarii, recenzii, Epilog.
2. Pentru audiobook apasă `A` și folosește Play/Pauză.
3. Pentru altă limbă deschide meniul „Traduceri" și alege limba.
4. „✨ Recenzia ta" și „🚀 Ending-ul tău" trimit textul tău unui API de AI doar când acționezi (și confirmi).
5. Datele locale se pot șterge cu „🗑️ Șterge toate datele locale acum" din pagina de cookies/confidențialitate.

## Confidențialitate și rețea

Local (`localStorage`/`sessionStorage`), conform paginii de cookies a aplicației: preferințe vizuale și audio (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` etc.), progres și semne de carte (`pi-progress`, `pi-bookmarks`), recenzii și finaluri proprii (`pi-reviews`, `pi-endings`, `c108entries`), confirmarea bannerului legal, și `nlSubs` (adresele introduse în formularul de newsletter sunt doar salvate local de acest cod).

Gazde terțe contactate:

- `alexio.tf`: imagini ilustrative (cerute la încărcare; singura cerere externă fără acțiune a utilizatorului) și previzualizări de distribuire.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker către Azure Neural TTS): **doar dacă bifezi explicit** „Voce online Azure Neural” în panoul de voci al audiobook-ului (opt-in, implicit oprit; preferința se păstrează în `pi_azure_tts`); atunci se face o cerere de test și textul citit pleacă la proxy pentru sinteză; fără opt-in se folosește vocea locală a browserului și la încărcare nu pleacă nicio cerere către acest serviciu.
- `translate.googleapis.com`: numai dacă alegi o altă limbă din „Traduceri"; textul paginii este trimis la Google Translate.
- Un API de AI prin `/api/claude` (proxy-ul `claude-proxy.worker.js` din repository, către API-ul Anthropic): numai dacă folosești „Recenzia ta" / „Ending-ul tău".
- Fonturi Google: verificat la audit (2026-10-10) — nu există nicio cerere către `fonts.googleapis.com` / `fonts.gstatic.com`; pagina de confidențialitate le menționează doar condiționat.
- Formularul „Următoarea poveste” (newsletter): adresa de email se salvează doar local, în `localStorage` (`nlSubs`); nu se trimite nicăieri și nimeni nu va primi notificări pe baza ei, deși mesajul de confirmare spune „Te anunț când apare ceva nou”.

Pagina găzduită pe GitHub Pages nu are ruta `/api/claude`, așa că funcțiile generative probabil nu răspund acolo decât dacă este configurat `window.PI_API_ENDPOINT`.

## Avertisment

Ficțiune / speculație: romanul, scenariile și cele 108 recenzii sunt opere de ficțiune; recenziile sunt fictive, iar valorile „cititori activi” sunt simulate (marcate „~simulat” în pagină). Povestea folosește numele reale ale membrilor echipajului Artemis 2 (Koch, Wiseman, Glover, Hansen) ca personaje într-un scenariu integral imaginar; nu este afiliată NASA, CSA, ESA sau echipajul. Textele generate prin „Recenzia ta” / „Ending-ul tău” sunt produse de un model AI și pot conține erori.

## Rulare locală / offline

Descarcă repository-ul și deschide `index.html`: textul cărții este inclus în fișier și se citește fără internet. Au nevoie de internet: audiobook-ul cu voce online (opțională; altfel vocea locală), traducerile, funcțiile generative și imaginile de pe alexio.tf. Service Worker-ul se înregistrează la calea `/sw.js` și funcționează doar pe http(s), nu din fișier local.

## Licență

NEREZOLVAT: licența nu este declarată explicit în acest repository și nu am ales una. Semnale contradictorii în fișiere: metadatele JSON-LD ale paginii indică `https://creativecommons.org/licenses/by-nc-nd/4.0/`, iar antetele din `index.html`, `sw.js` și `claude-proxy.worker.js` indică „TRADE-FREE + CC0 1.0”. Conținutul cărții este o colaborare (autor + model AI, dezvăluită în Epilog) și include texte fictive atribuite unor terți (recenzii, personaje), deci regimul de drepturi trebuie stabilit de autor/coautori; până atunci, nu presupune nicio licență de reutilizare. Nu există fișier LICENSE.

## Funcții noi (v1.1.0)

- **Marcaje și note pe pasaje** (butonul 📝 din bara de sus): selectezi un fragment dintr-o pagină (carte, scenarii, recenzii), adaugi o notă; se păstrează doar în browser (FFF.store), „Mergi la fragment” te duce la pagina și la paragraful respectiv, notele se pot șterge și exporta ca Markdown. Sunt separate de semnele de carte existente (`pi-bookmarks`), care rămân neschimbate.
- **Copie de siguranță .fff.json** prin eticheta „Transparență” (clic pe `v 1.1.0 · 2026-10-14` din „Termeni & Confidențialitate”): exportă/importă (opțional criptat cu parolă) progresul, semnele de carte, notele și recenziile proprii; arată cheile stocate și rețeaua declarată.
- Kit comun (core, label, bundle). Căutarea (Ctrl+K), audiobook-ul și traducerea existente nu au fost modificate. Cache Service Worker: pi-v15.
- Textele noi sunt în ro, en, fr, it, es, pt, hu, de; traducerile fr/it/es/pt/hu/de sunt automate și neverificate nativ.
- Teste: `tests/fff-r8.test.mjs` (rețea blocată; imaginile alexio.tf, cerute și înainte, sunt excluse din numărătoare; 1280 și 360 px, axe 0 violări cu dialogul deschis).

## Istoric / Changelog

### 1.1.0 — 2026-10-14
- Nou: marcaje și note pe pasaje cu export Markdown; copie de siguranță .fff.json și etichetă de transparență (kit comun). Cache SW pi-v15.

### 1.0.0 — 2026-10-12
- Versiunea și data ultimei actualizări sunt afișate în aplicație (fereastra „Termeni & Confidențialitate”).

### 11 octombrie 2026 (runda 7)
- Reparat: grupurile restrânse din meniul lateral (CARTEA, SCENARII, ACȚIUNI etc.) ascundeau linkurile doar vizual (`max-height:0`); acestea rămâneau în ordinea Tab și sub elementele vecine (clic real interceptat de titlurile grupurilor). Acum grupurile restrânse sunt `visibility:hidden` (cu tranziție), deci nu mai pot fi focalizate sau citite de cititoarele de ecran. Verificat: clic real pe „Prolog” după deschiderea grupului, 0 violări axe-core. Cache Service Worker: pi-v14.
- Reparat: în vizualizarea de lectură, panoul audiobook, banda „Disclaimer & Termeni” și notificarea „Funcții noi” nu erau în niciun reper ARIA (axe-core `region`); au acum `role="region"`/`role="status"`.

### 11 octombrie 2026 (runda 6)
- Reparat: cele 354 de handlere inline (`onclick`, `onchange` etc.) au fost înlocuite cu un dispatcher delegat (`data-on-*` + un singur listener, fără eval/Function; argumentele dinamice trec printr-o listă albă de funcții). Paritate verificată pe 495 de elemente (0 diferențe). CSP-ul are acum `script-src` cu 16 hash-uri sha256, fără `'unsafe-inline'`.

### 11 octombrie 2026
- Actualizat: misiunea reală Artemis 2 nu mai este descrisă ca „programată”: zbor de test în jurul Lunii, lansat în aprilie 2026, amerizare în Pacific pe 10 aprilie 2026 (echipaj Wiseman, Glover, Koch, Hansen). Surse verificate la 11.10.2026: NBC Palm Springs (10.04.2026), NASA. Textul ficțional al romanului nu a fost modificat.
- Reparat: intro-ul cinematic se poate închide de la tastatură (butonul × este acum `<button>`, plus tasta Escape); durata de 18,35 s a intro-ului rămâne decizie artistică a autorului.
- Reparat: imaginile cărții (servite de pe alexio.tf) au înlocuitor cu textul alternativ când rețeaua lipsește, în loc de pictogramă ruptă.
- Reparat: ferestrele/overlay-urile închise nu mai rămân focalizabile (visibility:hidden); `<footer>`, elemente decorative `aria-hidden`, fără `tabindex` pozitiv; 0 violări axe-core la 1280 și 360 px.
- Adăugat: politică CSP (meta) cu gazdele declarate (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); cache Service Worker pi-v12 (acum pi-v13).
- Neschimbat: contorul „citesc acum” rămâne simulat și etichetat astfel; licența/drepturile de autor nu au fost modificate (decizia autorului).

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## English summary

"Printre inteligențe" is an interactive Romanian-language SF novel built around the NASA Artemis 2 mission, published as a web app: prologue, chapters, epilogue, 17 alternate scenarios and 108 fictional reviews, with an integrated audiobook. It stores preferences, reading progress and user texts in localStorage. It contacts alexio.tf (images), a TTS proxy on Cloudflare Workers, Google Translate (only if you pick a language) and an AI API endpoint (only for the generative features). The licence is inconsistent in the files and not yet settled.

## Audit

Rundă 2 (2026-10-11): cererea de test către proxy-ul TTS de la încărcare a fost înlocuită cu un opt-in explicit în panoul de voci; formulările „offline / fără telemetrie / rulează integral în browser” din antet, FAQ, pagina de confidențialitate și rezumatul EN au fost precizate (textul cărții se citește offline; imaginile, vocea online, traducerea și funcțiile AI folosesc servicii externe); nota de ficțiune despre numele reale ale membrilor echipajului a fost completată în pagină (RO și EN). Licența rămâne NEREZOLVATĂ.

Audit: 2026-10-10 — claimurile de rețea din acest README corespund codului (fetch către `tts-proxy.chiuta.workers.dev` — inclusiv o cerere de test la încărcare —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; imagini de pe `alexio.tf`). Antetul aplicației spune „offline-first, fără telemetrie”, iar pagina conține formulări absolute („rulează integral în browser”, în rezumatul în engleză) care nu țin cont de aceste apeluri; licențele rămân contradictorii (JSON-LD CC BY-NC-ND 4.0 vs. antet CC0 1.0). Corectat accesibilitatea (contrast în toate temele, etichete la câmpurile de selectare).
