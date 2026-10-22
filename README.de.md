# Printre inteligențe

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

**Version:** 1.2.9 · **Zuletzt aktualisiert:** 2026-10-23

Oberflächensprachen: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Interaktiver SF-Roman über die Mission Artemis 2, „rezensiert von Sternen und Hyperzivilisationen“, mit integriertem Hörbuch.

**Online:** https://chiuta.github.io/PrintreInteligente/

![Screenshot](screenshot.png)

## Was es ist

„Printre inteligențe“ ist ein lebendiges Buch, veröffentlicht als Webanwendung (eine große Datei `index.html`, dazu `sw.js`, `robots.txt`, `sitemap.xml` und Vorschaubilder). Der Roman, inspiriert von der Mission Artemis 2 der NASA (Mondtestflug, abgeschlossen am 10. April 2026), versetzt die Besatzung in ein vollständig fiktives Szenario, in dem ein technischer Defekt sie zu einer Notlandung auf dem Mond zwingt. Laut Seite enthält das Buch einen Prolog, zwei Kapitel, einen Epilog, 17 alternative Szenarien in 5 Familien und 108 fiktive Rezensionen in 12 Kategorien (literarische, philosophische, von Lesern, von zukünftigen KI, NHI, Hyperzivilisationen usw.). Die Seite erklärt, dass es sich um ein Werk der Fiktion handelt, ohne Verbindung zur NASA oder CSA, und dass es eine Zusammenarbeit von Mensch und KI ist, die im Epilog offengelegt wird.

## Funktionen

- Navigation nach Abschnitten (Seitenmenü): Buch, Szenarien, Rezensionen.
- Integriertes Hörbuch mit Sprachsynthese (Online-Dienst oder lokale Stimme des Browsers), Stimm- und Wiedergabeeinstellungen.
- Generative Funktionen „✨ Deine Rezension“ und „🚀 Dein Ende“, die über einen konfigurierbaren Endpunkt (`/api/claude`) eine KI-API aufrufen.
- Suche, Tag-/Nacht-Thema, Lesemodus, optionale Hintergründe und Soundeffekte, Lesefortschritt und Lesezeichen.
- Das Buch (Epilog, Kapitel, 17 Szenarien und 108 Rezensionen) liegt in 8 Sprachen vor (rumänisches Original plus Englisch, Französisch, Italienisch, Spanisch, Portugiesisch, Deutsch und Ungarisch) und ist in der Datei enthalten: Die Sprache wird über das Menü „Übersetzungen“ ohne jede Netzwerkanfrage gewechselt, und Suche, A4-Export, Seitenmetadaten und Hörbuch folgen der gewählten Sprache. Für die übrigen Sprachen des Menüs (insgesamt 62) wird die Seite auf Wunsch über Google Translate übersetzt.
- Die in der Datei enthaltenen Übersetzungen entstanden mit KI-Unterstützung und **müssen von Muttersprachlern geprüft werden**; die Rechtsseiten und Demotexte bleiben auf Rumänisch (nur ihre Titel sind übersetzt); auch der juristische Inhalt und die medizinischen/physiologischen Passagen (Sauerstoffwerte, Dosen) müssen fachlich geprüft werden.
- Panel mit Tastenkürzeln (aufgerufen mit `?`).
- Rechtsseiten in der Anwendung: Datenschutz/DSGVO, Cookies, Schaltfläche „Alle lokalen Daten löschen“.
- PWA: Manifest und Service Worker (`sw.js`).

## Bedienungsanleitung

Von der Anwendung angezeigte Kürzel:

- `← →` vorherige / nächste Seite; `↑ ↓` Scrollen
- `Esc` schließt jedes Modal oder Panel
- `/` oder `Strg+F` öffnet die Suche
- `H` Startseite; `D` schaltet das Tag-/Nacht-Thema um
- `A` öffnet das Hörbuch; `Leertaste` Wiedergabe/Pause des Hörbuchs
- `?` zeigt die Liste der Kürzel

Schritte:

1. Lesen Sie über das Seitenmenü: Prolog, Kapitel 1-2, Szenarien, Rezensionen, Epilog.
2. Für das Hörbuch drücken Sie `A` und nutzen Wiedergabe/Pause.
3. Für eine andere Sprache öffnen Sie das Menü „Übersetzungen“ und wählen die Sprache. Die 8 in der Datei enthaltenen Sprachen funktionieren offline; die übrigen nutzen Google Translate (siehe den Abschnitt zum Netzwerk).
4. „✨ Deine Rezension“ und „🚀 Dein Ende“ senden deinen Text nur dann an eine KI-API, wenn du handelst (und bestätigst).
5. Lokale Daten können mit „🗑️ Jetzt alle lokalen Daten löschen“ auf der Cookie-/Datenschutzseite gelöscht werden.

## Datenschutz und Netzwerk

Lokal (`localStorage`/`sessionStorage`), laut der Cookie-Seite der Anwendung: visuelle und Audio-Einstellungen (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` usw.), Fortschritt und Lesezeichen (`pi-progress`, `pi-bookmarks`), eigene Rezensionen und Enden (`pi-reviews`, `pi-endings`, `c108entries`), Bestätigung des Rechtsbanners und `nlSubs` (die im Newsletter-Formular eingegebenen Adressen werden von diesem Code nur lokal gespeichert).

Kontaktierte Drittanbieter-Hosts:

- `alexio.tf`: Illustrationsbilder (beim Laden angefordert; die einzige externe Anfrage ohne Benutzeraktion) und Freigabevorschauen.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker zu Azure Neural TTS): **nur wenn du ausdrücklich** „Azure-Neural-Online-Stimme“ im Stimmen-Panel des Hörbuchs ankreuzt (Opt-in, standardmäßig aus; die Einstellung wird in `pi_azure_tts` gespeichert); dann wird eine Testanfrage gestellt und der gelesene Text geht zur Synthese an den Proxy; ohne Opt-in wird die lokale Stimme des Browsers verwendet und beim Laden geht keine Anfrage an diesen Dienst.
- `translate.googleapis.com`: nur wenn du unter „Übersetzungen“ eine andere als die 8 in der Datei enthaltenen Sprachen wählst (ro, en, fr, it, es, pt, de, hu); der Text der Seite wird an Google Translate gesendet.
- Eine KI-API über `/api/claude` (der Proxy `claude-proxy.worker.js` aus dem Repository, zur Anthropic-API): nur wenn du „Deine Rezension“ / „Dein Ende“ nutzt.
- Google Fonts: im Audit geprüft (2026-10-10) — es gibt keine Anfrage an `fonts.googleapis.com` / `fonts.gstatic.com`; die Datenschutzseite erwähnt sie nur bedingt.
- Das Formular „Nächste Geschichte“ (Newsletter): Die E-Mail-Adresse wird nur lokal in `localStorage` gespeichert (`nlSubs`); sie wird nirgendwohin gesendet, und niemand erhält auf dieser Grundlage Benachrichtigungen, obwohl die Bestätigungsmeldung sagt „Ich sage dir Bescheid, wenn etwas Neues erscheint“.

Die auf GitHub Pages gehostete Seite hat die Route `/api/claude` nicht, daher antworten die generativen Funktionen dort wahrscheinlich nicht, es sei denn, `window.PI_API_ENDPOINT` ist konfiguriert.

## Hinweis

Fiktion / Spekulation: Der Roman, die Szenarien und die 108 Rezensionen sind Werke der Fiktion; die Rezensionen sind fiktiv, und die Werte „aktive Leser“ sind simuliert (auf der Seite mit „~simuliert“ gekennzeichnet). Die Geschichte verwendet die echten Namen der Besatzungsmitglieder von Artemis 2 (Koch, Wiseman, Glover, Hansen) als Figuren in einem vollständig erfundenen Szenario; sie steht in keiner Verbindung zur NASA, CSA, ESA oder zur Besatzung. Die über „Deine Rezension“ / „Dein Ende“ erzeugten Texte stammen von einem KI-Modell und können Fehler enthalten.

## Lokale Ausführung / offline

Laden Sie das Repository herunter und öffnen Sie `index.html`: Der Text des Buches ist in der Datei enthalten und lässt sich ohne Internet lesen. Internet benötigen: das Hörbuch mit Online-Stimme (optional; sonst die lokale Stimme), die Übersetzungen in andere als die 8 enthaltenen Sprachen, die generativen Funktionen und die Bilder von alexio.tf. Der Service Worker registriert sich unter dem Pfad `/sw.js` und funktioniert nur über http(s), nicht aus einer lokalen Datei.

## Lizenz

MIT — siehe Datei [LICENSE](LICENSE). Die Urheberrechte bleiben gewahrt; der Code und der Text des Buches dürfen unter Beibehaltung des Lizenzhinweises verwendet, kopiert, verändert und weiterverbreitet werden.

## Neue Funktionen (v1.1.0)

- **Lesezeichen und Notizen zu Textstellen** (Schaltfläche 📝 in der oberen Leiste): Du wählst ein Fragment einer Seite (Buch, Szenarien, Rezensionen) aus und fügst eine Notiz hinzu; sie wird nur im Browser gespeichert (FFF.store), „Zum Fragment“ führt dich zur betreffenden Seite und zum Absatz, Notizen lassen sich löschen und als Markdown exportieren. Sie sind getrennt von den bestehenden Lesezeichen (`pi-bookmarks`), die unverändert bleiben.
- **.fff.json-Sicherung** über das Label „Transparenz“ (Klick auf `v 1.1.0 · 2026-10-14` unter „Bedingungen & Datenschutz“): exportiert/importiert (optional mit Passwort verschlüsselt) Fortschritt, Lesezeichen, Notizen und eigene Rezensionen; zeigt die gespeicherten Schlüssel und das deklarierte Netzwerk.
- Gemeinsames Kit (core, label, bundle). Die bestehende Suche (Strg+K), das Hörbuch und die Übersetzung wurden nicht verändert. Service-Worker-Cache: pi-v15.
- Die neuen Texte sind in ro, en, fr, it, es, pt, hu, de; die Übersetzungen fr/it/es/pt/hu/de sind automatisch und nicht muttersprachlich geprüft.
- Tests: `tests/fff-r8.test.mjs` (Netzwerk blockiert; die auch zuvor angeforderten Bilder von alexio.tf sind aus der Zählung ausgenommen; 1280 und 360 px, axe 0 Verstöße bei geöffnetem Dialog).

## Verlauf / Changelog

### 1.2.9 — 2026-10-23

- Die nativen `confirm()`-Dialoge wurden durch `FFF.dialog` ersetzt (barrierefrei, übersetzt; Kit 1.2.0); das Verhalten bleibt unverändert.
- Die Schlüssel des lokalen Speichers verwenden jetzt das Präfix `printreinteligente.` (`FFF.store.migrate` beim Start, vor jedem Lesezugriff): vorhandene Daten bleiben automatisch erhalten, alte `.fff.json`-Sicherungen lassen sich weiterhin importieren.

### 1.2.7 — 2026-10-22

fff-kit 1.1.4: Touch-Ziele und Mindestschriftgröße; Touch-Ziele und Text korrigiert.

### 1.2.6 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 mit 600.000 Iterationen, Schutz vor Clickjacking

### 1.2.5 — 2026-10-22
- Speicher: Die generischen localStorage-Schlüssel (Hintergrund, Mondmodus, Lesemodus, Soundeffekte, Stimmen, 108-Wörter-Rezension, Newsletter) tragen jetzt das eindeutige Präfix `printreinteligente.`; vorhandene Werte werden automatisch aus den alten Schlüsseln übernommen.
- Barrierefreiheit: Das Suchfeld hat einen zugänglichen Namen; der Tastaturfokus ist im Suchpanel und im Suchfeld der Seitenleiste sichtbar.
- Blockierende `alert()`-Meldungen wurden durch nicht-modale, übersetzte Benachrichtigungen ersetzt (role=status).

### 1.2.4 — 2026-10-22
- Die letzten Oberflächentexte, die in den anderen Sprachen noch rumänisch waren, sind jetzt übersetzt: das vollständige Szenarioverzeichnis, die letzte Übertragung mit Schlusszitat und Unterstützungshinweis sowie der Zusatz „das Bild benötigt eine Internetverbindung“ in den Abbildungsunterschriften.

### 1.2.3 — 2026-10-22
- Seitentitel, Titel der Social-Cards und Bildbeschreibungen folgen der Oberflächensprache (der Romanauszug in der Beschreibung bleibt als Originaltext rumänisch).

### 1.2.2 — 2026-10-19
- Der gesamte Erzähltext (Epilog, Kapitel, Szenarien und die 108 Rezensionen: 115 Seiten) liegt neben dem rumänischen Original in 7 Übersetzungen vor (en, fr, it, es, pt, de, hu), ohne Rückfall auf Rumänisch; Suche, A4-Export, Seitenmetadaten und Hörbuch verwenden die gewählte Sprache. Die Rechts-/Demotexte bleiben auf Rumänisch. SW-Cache pi-v18.

### 1.1.0 — 2026-10-14
- Neu: Lesezeichen und Notizen zu Textstellen mit Markdown-Export; .fff.json-Sicherung und Transparenz-Label (gemeinsames Kit). SW-Cache pi-v15.

### 1.0.0 — 2026-10-12
- Die Version und das Datum der letzten Aktualisierung werden in der Anwendung angezeigt (Fenster „Bedingungen & Datenschutz“).

### 11. Oktober 2026 (Runde 7)
- Behoben: Die eingeklappten Gruppen im Seitenmenü (DAS BUCH, SZENARIEN, AKTIONEN usw.) verbargen die Links nur optisch (`max-height:0`); diese blieben in der Tab-Reihenfolge und unter den Nachbarelementen (echter Klick wurde von den Gruppentiteln abgefangen). Jetzt sind eingeklappte Gruppen `visibility:hidden` (mit Übergang), können also nicht mehr fokussiert oder von Screenreadern gelesen werden. Geprüft: echter Klick auf „Prolog“ nach dem Öffnen der Gruppe, 0 axe-core-Verstöße. Service-Worker-Cache: pi-v14.
- Behoben: In der Leseansicht befanden sich das Hörbuch-Panel, der Streifen „Disclaimer & Bedingungen“ und die Benachrichtigung „Neue Funktionen“ in keiner ARIA-Landmarke (axe-core `region`); sie haben jetzt `role="region"`/`role="status"`.

### 11. Oktober 2026 (Runde 6)
- Behoben: Die 354 Inline-Handler (`onclick`, `onchange` usw.) wurden durch einen delegierten Dispatcher ersetzt (`data-on-*` + ein einziger Listener, ohne eval/Function; dynamische Argumente laufen über eine Whitelist von Funktionen). Parität an 495 Elementen geprüft (0 Unterschiede). Die CSP hat jetzt `script-src` mit 16 sha256-Hashes, ohne `'unsafe-inline'`.

### 11. Oktober 2026
- Aktualisiert: Die reale Mission Artemis 2 wird nicht mehr als „geplant“ beschrieben: Testflug um den Mond, gestartet im April 2026, Wasserung im Pazifik am 10. April 2026 (Besatzung Wiseman, Glover, Koch, Hansen). Quellen geprüft am 11.10.2026: NBC Palm Springs (10.04.2026), NASA. Der fiktive Text des Romans wurde nicht verändert.
- Behoben: Das filmische Intro lässt sich mit der Tastatur schließen (die Schaltfläche × ist jetzt ein `<button>`, dazu die Escape-Taste); die Dauer von 18,35 s des Intros bleibt eine künstlerische Entscheidung des Autors.
- Behoben: Die Bilder des Buches (von alexio.tf geliefert) haben bei fehlendem Netzwerk einen Ersatz mit dem Alternativtext statt eines defekten Symbols.
- Behoben: Geschlossene Fenster/Overlays bleiben nicht mehr fokussierbar (visibility:hidden); `<footer>`, dekorative `aria-hidden`-Elemente, kein positives `tabindex`; 0 axe-core-Verstöße bei 1280 und 360 px.
- Hinzugefügt: CSP-Richtlinie (Meta) mit den deklarierten Hosts (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); Service-Worker-Cache pi-v12 (jetzt pi-v13).
- Unverändert: Der Zähler „lesen gerade“ bleibt simuliert und als solcher gekennzeichnet; die Lizenz/die Urheberrechte wurden nicht verändert (Entscheidung des Autors).

## Autor

Alexio — Alexandru-Ionuț Chiuță, Kontakt: alexio@trom.tf

## Zusammenfassung

„Printre inteligențe“ ist ein interaktiver SF-Roman (rumänisches Original, mit Übersetzungen in 7 Sprachen) rund um die NASA-Mission Artemis 2, veröffentlicht als Web-App: Prolog, Kapitel, Epilog, 17 alternative Szenarien und 108 fiktive Rezensionen, mit integriertem Hörbuch. Einstellungen, Lesefortschritt und Texte der Nutzer werden in localStorage gespeichert. Sie kontaktiert alexio.tf (Bilder), einen TTS-Proxy auf Cloudflare Workers, Google Translate (nur wenn du eine Sprache außerhalb der 8 enthaltenen wählst) und einen KI-API-Endpunkt (nur für die generativen Funktionen). Lizenz: MIT.

## Audit

Runde 2 (2026-10-11): Die Testanfrage an den TTS-Proxy beim Laden wurde durch ein ausdrückliches Opt-in im Stimmen-Panel ersetzt; die Formulierungen „offline / ohne Telemetrie / läuft vollständig im Browser“ in Kopfzeile, FAQ, Datenschutzseite und EN-Zusammenfassung wurden präzisiert (der Buchtext ist offline lesbar; Bilder, Online-Stimme, Übersetzung und KI-Funktionen nutzen externe Dienste); der Fiktionshinweis zu den echten Namen der Besatzungsmitglieder wurde auf der Seite ergänzt (RO und EN). Lizenz: MIT.

Audit: 2026-10-10 — die Netzwerkangaben in dieser README stimmen mit dem Code überein (fetch an `tts-proxy.chiuta.workers.dev` — einschließlich einer Testanfrage beim Laden —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; Bilder von `alexio.tf`). Die Kopfzeile der Anwendung sagt „offline-first, ohne Telemetrie“, und die Seite enthält absolute Formulierungen („läuft vollständig im Browser“, in der englischen Zusammenfassung), die diese Aufrufe nicht berücksichtigen; die Lizenz wurde später als MIT festgelegt. Barrierefreiheit korrigiert (Kontrast in allen Themen, Beschriftungen an Auswahlfeldern).
