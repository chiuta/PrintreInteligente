# Printre inteligențe

Roman SF interactiv despre misiunea Artemis 2, „recenzat de stele și hipercivilizații", cu audiobook integrat.

**Live:** https://chiuta.github.io/PrintreInteligente/

![Captura de ecran](screenshot.png)

## Ce este

„Printre inteligențe" este o carte vie, publicată ca aplicație web (un fișier `index.html` mare, plus `sw.js`, `robots.txt`, `sitemap.xml` și imagini de previzualizare). Romanul, inspirat de misiunea Artemis 2 a NASA, plasează echipajul într-un scenariu integral ficțional, în care o defecțiune tehnică îi obligă la o aselenizare de urgență. Conform paginii, cartea conține un Prolog, două capitole, un Epilog, 17 scenarii alternative, grupate în 5 familii, și 108 recenzii fictive în 12 categorii (literare, filosofice, ale cititorilor, ale AI din viitor, NHI, hipercivilizații etc.). Pagina declară că este o operă de ficțiune, nu este afiliată NASA sau CSA, și că este o colaborare om-AI, dezvăluită în Epilog.

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

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## English summary

"Printre inteligențe" is an interactive Romanian-language SF novel built around the NASA Artemis 2 mission, published as a web app: prologue, chapters, epilogue, 17 alternate scenarios and 108 fictional reviews, with an integrated audiobook. It stores preferences, reading progress and user texts in localStorage. It contacts alexio.tf (images), a TTS proxy on Cloudflare Workers, Google Translate (only if you pick a language) and an AI API endpoint (only for the generative features). The licence is inconsistent in the files and not yet settled.

## Audit

Rundă 2 (2026-10-11): cererea de test către proxy-ul TTS de la încărcare a fost înlocuită cu un opt-in explicit în panoul de voci; formulările „offline / fără telemetrie / rulează integral în browser” din antet, FAQ, pagina de confidențialitate și rezumatul EN au fost precizate (textul cărții se citește offline; imaginile, vocea online, traducerea și funcțiile AI folosesc servicii externe); nota de ficțiune despre numele reale ale membrilor echipajului a fost completată în pagină (RO și EN). Licența rămâne NEREZOLVATĂ.

Audit: 2026-10-10 — claimurile de rețea din acest README corespund codului (fetch către `tts-proxy.chiuta.workers.dev` — inclusiv o cerere de test la încărcare —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; imagini de pe `alexio.tf`). Antetul aplicației spune „offline-first, fără telemetrie”, iar pagina conține formulări absolute („rulează integral în browser”, în rezumatul în engleză) care nu țin cont de aceste apeluri; licențele rămân contradictorii (JSON-LD CC BY-NC-ND 4.0 vs. antet CC0 1.0). Corectat accesibilitatea (contrast în toate temele, etichete la câmpurile de selectare).
