# Printre inteligențe

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

**Verzió:** 1.2.0 · **Utolsó frissítés:** 2026-10-19

A felület nyelvei: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Interaktív sci-fi regény az Artemis 2 küldetésről, „csillagok és hipercivilizációk által recenzeálva”, beépített hangoskönyvvel.

**Élő változat:** https://chiuta.github.io/PrintreInteligente/

![Képernyőkép](screenshot.png)

## Mi ez

A „Printre inteligențe” élő könyv, webalkalmazásként kiadva (egy nagy `index.html` fájl, plusz `sw.js`, `robots.txt`, `sitemap.xml` és előnézeti képek). A regény, amelyet a NASA Artemis 2 küldetése ihletett (holdi tesztrepülés, 2026. április 10-én zárult), a legénységet egy teljesen kitalált forgatókönyvbe helyezi, amelyben egy műszaki hiba sürgősségi holdra szállásra kényszeríti őket. Az oldal szerint a könyv tartalmaz egy Prológust, két fejezetet, egy Epilógust, 17 alternatív forgatókönyvet 5 családba csoportosítva, valamint 108 kitalált recenziót 12 kategóriában (irodalmi, filozófiai, olvasói, jövőbeli MI-ké, NHI, hipercivilizációk stb.). Az oldal kijelenti, hogy fikciós műről van szó, amely nem áll kapcsolatban a NASA-val vagy a CSA-val, és hogy ember–MI együttműködés, amelyet az Epilógus felfed.

## Funkciók

- Navigáció szakaszok szerint (oldalmenü): könyv, forgatókönyvek, recenziók.
- Beépített hangoskönyv beszédszintézissel (online szolgáltatás vagy a böngésző helyi hangja), hang- és lejátszási beállításokkal.
- „✨ Saját recenziód” és „🚀 Saját befejezésed” generatív funkciók, amelyek egy beállítható végponton (`/api/claude`) keresztül MI-API-t hívnak.
- Keresés, nappali/éjszakai téma, olvasó mód, opcionális hátterek és hanghatások, olvasási előrehaladás és könyvjelzők.
- Az oldal automatikus fordítása, választás szerint, nyelvek hosszú listájára („Fordítások” menü; az eredeti nyelv a román).
- Billentyűparancs-panel (a `?` billentyűvel hívható elő).
- Jogi oldalak az alkalmazásban: adatvédelem/GDPR, sütik, „Minden helyi adat törlése” gomb.
- PWA: manifest és Service Worker (`sw.js`).

## Használati útmutató

Az alkalmazás által megjelenített billentyűparancsok:

- `← →` előző / következő oldal; `↑ ↓` görgetés
- `Esc` bezár minden modális ablakot vagy panelt
- `/` vagy `Ctrl+F` megnyitja a keresést
- `H` kezdőlap; `D` váltja a nappali/éjszakai témát
- `A` megnyitja a hangoskönyvet; `Szóköz` lejátszás/szünet a hangoskönyvben
- `?` megjeleníti a billentyűparancsok listáját

Lépések:

1. Olvass az oldalmenüből: Prológus, 1–2. fejezet, forgatókönyvek, recenziók, Epilógus.
2. A hangoskönyvhöz nyomd meg az `A` billentyűt, és használd a Lejátszás/Szünet gombot.
3. Másik nyelvhez nyisd meg a „Fordítások” menüt, és válaszd ki a nyelvet.
4. A „✨ Saját recenziód” és a „🚀 Saját befejezésed” csak akkor küldi el a szövegedet MI-API-nak, ha cselekszel (és megerősíted).
5. A helyi adatok a „🗑️ Minden helyi adat törlése most” gombbal törölhetők a sütik/adatvédelem oldalon.

## Adatvédelem és hálózat

Helyi (`localStorage`/`sessionStorage`), az alkalmazás sütioldala szerint: vizuális és hangbeállítások (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` stb.), előrehaladás és könyvjelzők (`pi-progress`, `pi-bookmarks`), saját recenziók és befejezések (`pi-reviews`, `pi-endings`, `c108entries`), a jogi sáv megerősítése, valamint az `nlSubs` (a hírlevélűrlapon megadott címeket ez a kód csak helyben menti).

Kapcsolatba lépett harmadik fél gazdagépei:

- `alexio.tf`: illusztrációs képek (betöltéskor kéri le; az egyetlen külső kérés felhasználói művelet nélkül) és megosztási előnézetek.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker az Azure Neural TTS felé): **csak ha kifejezetten bejelölöd** az „Azure Neural online hang” opciót a hangoskönyv hangpaneljén (opt-in, alapértelmezés szerint kikapcsolva; a beállítás a `pi_azure_tts` kulcsban marad meg); ekkor tesztkérés történik, és a felolvasott szöveg a proxyhoz kerül szintézisre; opt-in nélkül a böngésző helyi hangja használatos, és betöltéskor nem indul kérés erre a szolgáltatásra.
- `translate.googleapis.com`: csak ha a „Fordítások” menüből másik nyelvet választasz; az oldal szövege a Google Translate-nek kerül elküldésre.
- Egy MI-API a `/api/claude` végponton keresztül (a tárhely `claude-proxy.worker.js` proxyja az Anthropic API felé): csak ha a „Saját recenziód” / „Saját befejezésed” funkciót használod.
- Google Fonts: az auditon ellenőrizve (2026-10-10) — nincs kérés a `fonts.googleapis.com` / `fonts.gstatic.com` felé; az adatvédelmi oldal csak feltételesen említi őket.
- A „Következő történet” űrlap (hírlevél): az e-mail-cím csak helyben, a `localStorage`-ban (`nlSubs`) tárolódik; sehová nem kerül elküldésre, és senki nem fog értesítést kapni ennek alapján, bár a visszaigazoló üzenet azt mondja: „Szólok, ha valami új jelenik meg”.

A GitHub Pagesen tárolt oldalnak nincs `/api/claude` útvonala, így a generatív funkciók valószínűleg nem válaszolnak ott, hacsak a `window.PI_API_ENDPOINT` nincs beállítva.

## Figyelmeztetés

Fikció / spekuláció: a regény, a forgatókönyvek és a 108 recenzió fikciós művek; a recenziók kitaláltak, az „aktív olvasók” értékei pedig szimuláltak (az oldalon „~szimulált” jelöléssel). A történet az Artemis 2 legénységének valódi neveit (Koch, Wiseman, Glover, Hansen) használja szereplőkként egy teljesen képzelt forgatókönyvben; nem áll kapcsolatban a NASA-val, a CSA-val, az ESA-val vagy a legénységgel. A „Saját recenziód” / „Saját befejezésed” útján generált szövegeket MI-modell állítja elő, és hibákat tartalmazhatnak.

## Helyi / offline futtatás

Töltsd le a tárhelyet, és nyisd meg az `index.html` fájlt: a könyv szövege a fájlban van, és internet nélkül olvasható. Internetet igényel: az online hangú hangoskönyv (opcionális; egyébként a helyi hang), a fordítások, a generatív funkciók és az alexio.tf képei. A Service Worker a `/sw.js` útvonalon regisztrálja magát, és csak http(s) felett működik, helyi fájlból nem.

## Licenc

MIT — lásd a [LICENSE](LICENSE) fájlt. A szerzői jogok megmaradnak; a kód és a könyv szövege a licencmegjegyzés megtartásával felhasználható, másolható, módosítható és terjeszthető.

## Újdonságok (v1.1.0)

- **Könyvjelzők és jegyzetek szövegrészekhez** (📝 gomb a felső sávban): kijelölsz egy részletet egy oldalról (könyv, forgatókönyvek, recenziók), és jegyzetet fűzöl hozzá; csak a böngészőben tárolódik (FFF.store), az „Ugrás a részletre” az adott oldalra és bekezdésre visz, a jegyzetek törölhetők és Markdownként exportálhatók. Elkülönülnek a meglévő könyvjelzőktől (`pi-bookmarks`), amelyek változatlanok maradnak.
- **.fff.json biztonsági mentés** az „Átláthatóság” címkén keresztül (kattintás a `v 1.1.0 · 2026-10-14` feliratra a „Feltételek és adatvédelem” alatt): exportálja/importálja (opcionálisan jelszóval titkosítva) az előrehaladást, a könyvjelzőket, a jegyzeteket és a saját recenziókat; megmutatja a tárolt kulcsokat és a deklarált hálózatot.
- Közös kit (core, label, bundle). A meglévő keresés (Ctrl+K), hangoskönyv és fordítás nem módosult. Service Worker gyorsítótár: pi-v15.
- Az új szövegek ro, en, fr, it, es, pt, hu, de nyelven vannak; az fr/it/es/pt/hu/de fordítások automatikusak, és anyanyelvi ellenőrzés nélküliek.
- Tesztek: `tests/fff-r8.test.mjs` (hálózat blokkolva; az alexio.tf képei, amelyeket korábban is lekértek, kimaradnak a számlálásból; 1280 és 360 px, axe 0 szabálysértés nyitott párbeszédablakkal).

## Előzmények / Changelog

### 1.1.0 — 2026-10-14
- Új: könyvjelzők és jegyzetek szövegrészekhez Markdown-exporttal; .fff.json biztonsági mentés és átláthatósági címke (közös kit). SW gyorsítótár pi-v15.

### 1.0.0 — 2026-10-12
- A verzió és az utolsó frissítés dátuma megjelenik az alkalmazásban („Feltételek és adatvédelem” ablak).

### 2026. október 11. (7. kör)
- Javítva: az oldalmenü összecsukott csoportjai (A KÖNYV, FORGATÓKÖNYVEK, MŰVELETEK stb.) a hivatkozásokat csak vizuálisan rejtették el (`max-height:0`); azok bent maradtak a Tab-sorrendben és a szomszédos elemek alatt (a valódi kattintást a csoportcímek fogták el). Mostantól az összecsukott csoportok `visibility:hidden` állapotúak (átmenettel), így nem fókuszálhatók és a képernyőolvasók nem olvashatják őket. Ellenőrizve: valódi kattintás a „Prológus” elemre a csoport megnyitása után, 0 axe-core szabálysértés. Service Worker gyorsítótár: pi-v14.
- Javítva: olvasó nézetben a hangoskönyv-panel, a „Disclaimer & Feltételek” sáv és az „Újdonságok” értesítés egyetlen ARIA-eligazodási ponton sem volt benne (axe-core `region`); mostantól `role="region"`/`role="status"` attribútumot kaptak.

### 2026. október 11. (6. kör)
- Javítva: a 354 beágyazott eseménykezelőt (`onclick`, `onchange` stb.) delegált diszpécser váltotta fel (`data-on-*` + egyetlen eseményfigyelő, eval/Function nélkül; a dinamikus argumentumok függvények fehér listáján mennek át). A paritás 495 elemen ellenőrizve (0 eltérés). A CSP-ben mostantól 16 sha256 hashű `script-src` van, `'unsafe-inline'` nélkül.

### 2026. október 11.
- Frissítve: a valódi Artemis 2 küldetés már nem „tervezettként” van leírva: a Hold körüli tesztrepülés 2026 áprilisában indult, a Csendes-óceánon vízre szállás 2026. április 10-én (legénység: Wiseman, Glover, Koch, Hansen). Források ellenőrizve 2026.10.11-én: NBC Palm Springs (2026.04.10.), NASA. A regény kitalált szövegét nem módosították.
- Javítva: a filmszerű intró billentyűzettel bezárható (a × gomb mostantól `<button>`, plusz az Escape billentyű); az intró 18,35 másodperces hossza a szerző művészi döntése marad.
- Javítva: a könyv képei (az alexio.tf-ről szolgálva) hálózat hiányában az alternatív szöveges helyettesítőt kapják törött ikon helyett.
- Javítva: a bezárt ablakok/átfedések már nem maradnak fókuszálhatók (visibility:hidden); `<footer>`, dekoratív `aria-hidden` elemek, pozitív `tabindex` nélkül; 0 axe-core szabálysértés 1280 és 360 px-en.
- Hozzáadva: CSP-szabályzat (meta) a deklarált gazdagépekkel (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); Service Worker gyorsítótár pi-v12 (most pi-v13).
- Változatlan: a „most olvassák” számláló szimulált marad, és annak is van jelölve; a licenc/szerzői jogok nem módosultak (a szerző döntése).

## Szerző

Alexio — Alexandru-Ionuț Chiuță, kapcsolat: alexio@trom.tf

## Összefoglaló
A „Printre inteligențe” interaktív, román nyelvű sci-fi regény a NASA Artemis 2 küldetése köré építve, webalkalmazásként kiadva: prológus, fejezetek, epilógus, 17 alternatív forgatókönyv és 108 kitalált kritika, beépített hangoskönyvvel. A beállításokat, az olvasási haladást és a felhasználói szövegeket a localStorage-ban tárolja. Kapcsolatba lép az alexio.tf címmel (képek), egy Cloudflare Workers-en futó TTS-proxyval, a Google Fordítóval (csak ha nyelvet választasz) és egy MI API-végponttal (csak a generatív funkciókhoz). Licenc: MIT.

## Audit

2. kör (2026-10-11): a TTS-proxyhoz betöltéskor küldött tesztkérést kifejezett opt-in váltotta fel a hangpanelen; a fejlécben, a GYIK-ban, az adatvédelmi oldalon és az EN-összefoglalóban szereplő „offline / telemetria nélkül / teljes egészében a böngészőben fut” megfogalmazásokat pontosították (a könyv szövege offline olvasható; a képek, az online hang, a fordítás és az MI-funkciók külső szolgáltatásokat használnak); a legénység valódi nevére vonatkozó fikciós megjegyzés az oldalon kiegészült (RO és EN). Licenc: MIT.

Audit: 2026-10-10 — a README hálózati állításai megfelelnek a kódnak (fetch a `tts-proxy.chiuta.workers.dev` felé — betöltéskori tesztkérést is beleértve —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; képek az `alexio.tf`-ről). Az alkalmazás fejléce azt mondja: „offline-first, telemetria nélkül”, az oldal pedig abszolút megfogalmazásokat tartalmaz („teljes egészében a böngészőben fut”, az angol összefoglalóban), amelyek nem veszik figyelembe ezeket a hívásokat; a licencet később MIT-ként állapították meg. Akadálymentesség javítva (kontraszt minden témában, feliratok a választómezőkön).
