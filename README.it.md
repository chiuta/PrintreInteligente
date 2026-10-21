# Printre inteligențe

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versione:** 1.2.2 · **Ultimo aggiornamento:** 2026-10-19

Lingue dell'interfaccia: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Romanzo di fantascienza interattivo sulla missione Artemis 2, «recensito dalle stelle e dalle iperciviltà», con audiolibro integrato.

**Online:** https://chiuta.github.io/PrintreInteligente/

![Schermata](screenshot.png)

## Cos'è

«Printre inteligențe» è un libro vivo, pubblicato come applicazione web (un grande file `index.html`, più `sw.js`, `robots.txt`, `sitemap.xml` e immagini di anteprima). Il romanzo, ispirato alla missione Artemis 2 della NASA (volo di prova lunare, concluso il 10 aprile 2026), colloca l'equipaggio in uno scenario interamente fittizio, in cui un guasto tecnico lo costringe a un allunaggio d'emergenza. Secondo la pagina, il libro contiene un Prologo, due capitoli, un Epilogo, 17 scenari alternativi raggruppati in 5 famiglie e 108 recensioni fittizie in 12 categorie (letterarie, filosofiche, dei lettori, di IA del futuro, NHI, iperciviltà ecc.). La pagina dichiara che è un'opera di finzione, non affiliata alla NASA né alla CSA, e che è una collaborazione uomo-IA, svelata nell'Epilogo.

## Funzioni

- Navigazione per sezioni (menu laterale): libro, scenari, recensioni.
- Audiolibro integrato, con sintesi vocale (servizio online o voce locale del browser), impostazioni di voci e riproduzione.
- Funzioni generative «✨ La tua recensione» e «🚀 Il tuo finale», che chiamano un'API di IA tramite un endpoint configurabile (`/api/claude`).
- Ricerca, tema giorno/notte, modalità di lettura, sfondi ed effetti sonori opzionali, avanzamento di lettura e segnalibri.
- Traduzione automatica della pagina, a scelta, in un lungo elenco di lingue (menu «Traduzioni»; la lingua originale è il rumeno).
- Pannello delle scorciatoie da tastiera (richiamato con `?`).
- Pagine legali nell'applicazione: privacy/GDPR, cookie, pulsante «Elimina tutti i dati locali».
- PWA: manifest e Service Worker (`sw.js`).

## Guida all'uso

Scorciatoie mostrate dall'applicazione:

- `← →` pagina precedente / successiva; `↑ ↓` scorrimento
- `Esc` chiude qualsiasi finestra modale o pannello
- `/` o `Ctrl+F` apre la ricerca
- `H` home; `D` commuta il tema giorno/notte
- `A` apre l'audiolibro; `Spazio` play/pausa dell'audiolibro
- `?` mostra l'elenco delle scorciatoie

Passi:

1. Leggi dal menu laterale: Prologo, Capitoli 1-2, scenari, recensioni, Epilogo.
2. Per l'audiolibro premi `A` e usa Play/Pausa.
3. Per un'altra lingua apri il menu «Traduzioni» e scegli la lingua.
4. «✨ La tua recensione» e «🚀 Il tuo finale» inviano il tuo testo a un'API di IA solo quando agisci (e confermi).
5. I dati locali possono essere eliminati con «🗑️ Elimina ora tutti i dati locali» dalla pagina cookie/privacy.

## Privacy e rete

Locale (`localStorage`/`sessionStorage`), secondo la pagina dei cookie dell'applicazione: preferenze visive e audio (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` ecc.), avanzamento e segnalibri (`pi-progress`, `pi-bookmarks`), recensioni e finali personali (`pi-reviews`, `pi-endings`, `c108entries`), conferma del banner legale, e `nlSubs` (gli indirizzi inseriti nel modulo della newsletter sono solo salvati localmente da questo codice).

Host di terzi contattati:

- `alexio.tf`: immagini illustrative (richieste al caricamento; l'unica richiesta esterna senza azione dell'utente) e anteprime di condivisione.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker verso Azure Neural TTS): **solo se spunti esplicitamente** «Voce online Azure Neural» nel pannello delle voci dell'audiolibro (opt-in, disattivato di default; la preferenza è conservata in `pi_azure_tts`); allora viene fatta una richiesta di prova e il testo letto parte verso il proxy per la sintesi; senza opt-in si usa la voce locale del browser e al caricamento non parte nessuna richiesta verso questo servizio.
- `translate.googleapis.com`: solo se scegli un'altra lingua da «Traduzioni»; il testo della pagina viene inviato a Google Translate.
- Un'API di IA tramite `/api/claude` (il proxy `claude-proxy.worker.js` del repository, verso l'API Anthropic): solo se usi «La tua recensione» / «Il tuo finale».
- Google Fonts: verificato nell'audit (2026-10-10) — non c'è nessuna richiesta a `fonts.googleapis.com` / `fonts.gstatic.com`; la pagina della privacy li menziona solo in modo condizionale.
- Il modulo «Prossima storia» (newsletter): l'indirizzo e-mail è salvato solo in locale, in `localStorage` (`nlSubs`); non viene inviato da nessuna parte e nessuno riceverà notifiche sulla sua base, benché il messaggio di conferma dica «Ti avviso quando uscirà qualcosa di nuovo».

La pagina ospitata su GitHub Pages non ha la rotta `/api/claude`, quindi le funzioni generative probabilmente non rispondono lì a meno che `window.PI_API_ENDPOINT` non sia configurato.

## Avvertenza

Finzione / speculazione: il romanzo, gli scenari e le 108 recensioni sono opere di finzione; le recensioni sono fittizie e i valori dei «lettori attivi» sono simulati (contrassegnati «~simulato» nella pagina). La storia usa i nomi reali dei membri dell'equipaggio di Artemis 2 (Koch, Wiseman, Glover, Hansen) come personaggi in uno scenario interamente immaginario; non è affiliata alla NASA, alla CSA, all'ESA né all'equipaggio. I testi generati tramite «La tua recensione» / «Il tuo finale» sono prodotti da un modello di IA e possono contenere errori.

## Esecuzione locale / offline

Scarica il repository e apri `index.html`: il testo del libro è incluso nel file e si legge senza Internet. Servono Internet per: l'audiolibro con voce online (opzionale; altrimenti la voce locale), le traduzioni, le funzioni generative e le immagini di alexio.tf. Il Service Worker si registra al percorso `/sw.js` e funziona solo su http(s), non da file locale.

## Licenza

MIT — vedi il file [LICENSE](LICENSE). I diritti d'autore sono mantenuti; il codice e il testo del libro possono essere usati, copiati, modificati e ridistribuiti mantenendo la nota di licenza.

## Novità (v1.1.0)

- **Segnalibri e note sui passaggi** (pulsante 📝 della barra superiore): selezioni un frammento da una pagina (libro, scenari, recensioni), aggiungi una nota; viene conservata solo nel browser (FFF.store), «Vai al frammento» ti porta alla pagina e al paragrafo in questione, le note possono essere eliminate ed esportate come Markdown. Sono separate dai segnalibri esistenti (`pi-bookmarks`), che restano invariati.
- **Copia di sicurezza .fff.json** tramite l'etichetta «Trasparenza» (clic su `v 1.1.0 · 2026-10-14` in «Termini e privacy»): esporta/importa (opzionalmente cifrati con password) l'avanzamento, i segnalibri, le note e le recensioni personali; mostra le chiavi memorizzate e la rete dichiarata.
- Kit comune (core, label, bundle). La ricerca (Ctrl+K), l'audiolibro e la traduzione esistenti non sono stati modificati. Cache del Service Worker: pi-v15.
- I nuovi testi sono in ro, en, fr, it, es, pt, hu, de; le traduzioni fr/it/es/pt/hu/de sono automatiche e non verificate da madrelingua.
- Test: `tests/fff-r8.test.mjs` (rete bloccata; le immagini di alexio.tf, richieste anche prima, sono escluse dal conteggio; 1280 e 360 px, axe 0 violazioni con la finestra aperta).

## Storico / Changelog

### 1.1.0 — 2026-10-14
- Novità: segnalibri e note sui passaggi con esportazione Markdown; copia di sicurezza .fff.json ed etichetta di trasparenza (kit comune). Cache SW pi-v15.

### 1.0.0 — 2026-10-12
- La versione e la data dell'ultimo aggiornamento sono mostrate nell'applicazione (finestra «Termini e privacy»).

### 11 ottobre 2026 (round 7)
- Corretto: i gruppi compressi del menu laterale (IL LIBRO, SCENARI, AZIONI ecc.) nascondevano i link solo visivamente (`max-height:0`); restavano nell'ordine del Tab e sotto gli elementi vicini (clic reale intercettato dai titoli dei gruppi). Ora i gruppi compressi sono `visibility:hidden` (con transizione), quindi non possono più essere messi a fuoco né letti dagli screen reader. Verificato: clic reale su «Prologo» dopo l'apertura del gruppo, 0 violazioni axe-core. Cache del Service Worker: pi-v14.
- Corretto: nella vista di lettura, il pannello dell'audiolibro, la fascia «Disclaimer & Termini» e la notifica «Novità» non erano in alcun punto di riferimento ARIA (axe-core `region`); ora hanno `role="region"`/`role="status"`.

### 11 ottobre 2026 (round 6)
- Corretto: i 354 gestori inline (`onclick`, `onchange` ecc.) sono stati sostituiti da un dispatcher delegato (`data-on-*` + un solo listener, senza eval/Function; gli argomenti dinamici passano per una lista bianca di funzioni). Parità verificata su 495 elementi (0 differenze). La CSP ha ora `script-src` con 16 hash sha256, senza `'unsafe-inline'`.

### 11 ottobre 2026
- Aggiornato: la vera missione Artemis 2 non è più descritta come «programmata»: volo di prova attorno alla Luna, lanciato nell'aprile 2026, ammaraggio nel Pacifico il 10 aprile 2026 (equipaggio Wiseman, Glover, Koch, Hansen). Fonti verificate l'11.10.2026: NBC Palm Springs (10.04.2026), NASA. Il testo fittizio del romanzo non è stato modificato.
- Corretto: l'intro cinematografica può essere chiusa da tastiera (il pulsante × è ora un `<button>`, più il tasto Esc); la durata di 18,35 s dell'intro resta una decisione artistica dell'autore.
- Corretto: le immagini del libro (servite da alexio.tf) hanno un sostituto con il testo alternativo quando manca la rete, al posto di un'icona rotta.
- Corretto: le finestre/overlay chiusi non restano più focalizzabili (visibility:hidden); `<footer>`, elementi decorativi `aria-hidden`, nessun `tabindex` positivo; 0 violazioni axe-core a 1280 e 360 px.
- Aggiunto: politica CSP (meta) con gli host dichiarati (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); cache del Service Worker pi-v12 (ora pi-v13).
- Invariato: il contatore «leggono ora» resta simulato ed etichettato come tale; la licenza/i diritti d'autore non sono stati modificati (decisione dell'autore).

## Autore

Alexio — Alexandru-Ionuț Chiuță, contatto: alexio@trom.tf

## Riepilogo

«Printre inteligențe» è un romanzo di fantascienza interattivo in rumeno, costruito attorno alla missione NASA Artemis 2 e pubblicato come app web: prologo, capitoli, epilogo, 17 scenari alternativi e 108 recensioni fittizie, con un audiolibro integrato. Conserva preferenze, progressi di lettura e testi dell'utente in localStorage. Contatta alexio.tf (immagini), un proxy TTS su Cloudflare Workers, Google Translate (solo se scegli una lingua) e un endpoint API di IA (solo per le funzioni generative). Licenza: MIT.

## Audit

Round 2 (2026-10-11): la richiesta di prova al proxy TTS al caricamento è stata sostituita da un opt-in esplicito nel pannello delle voci; le formulazioni «offline / senza telemetria / funziona interamente nel browser» nell'intestazione, nelle FAQ, nella pagina della privacy e nel riepilogo EN sono state precisate (il testo del libro si legge offline; le immagini, la voce online, la traduzione e le funzioni di IA usano servizi esterni); la nota di finzione sui nomi reali dei membri dell'equipaggio è stata completata nella pagina (RO e EN). Licenza: MIT.

Audit: 2026-10-10 — le affermazioni sulla rete di questo README corrispondono al codice (fetch verso `tts-proxy.chiuta.workers.dev` — inclusa una richiesta di prova al caricamento —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; immagini da `alexio.tf`). L'intestazione dell'applicazione dice «offline-first, senza telemetria», e la pagina contiene formulazioni assolute («funziona interamente nel browser», nel riepilogo in inglese) che non tengono conto di queste chiamate; la licenza è stata poi stabilita come MIT. Corretta l'accessibilità (contrasto in tutti i temi, etichette nei campi di selezione).
