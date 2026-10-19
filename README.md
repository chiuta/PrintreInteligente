# Printre inteligențe

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 1.2.0 · **Last updated:** 2026-10-19

Interface languages: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

An interactive SF novel about the Artemis 2 mission, "reviewed by stars and hypercivilizations", with an integrated audiobook.

**Live:** https://chiuta.github.io/PrintreInteligente/

![Screenshot](screenshot.png)

## What it is

"Printre inteligențe" is a living book, published as a web application (one large `index.html` file, plus `sw.js`, `robots.txt`, `sitemap.xml` and preview images). The novel, inspired by NASA's Artemis 2 mission (a lunar test flight, concluded on 10 April 2026), places the crew in an entirely fictional scenario in which a technical failure forces them into an emergency lunar landing. According to the page, the book contains a Prologue, two chapters, an Epilogue, 17 alternate scenarios grouped into 5 families, and 108 fictional reviews in 12 categories (literary, philosophical, readers', from future AIs, NHI, hypercivilizations etc.). The page declares that it is a work of fiction, not affiliated with NASA or CSA, and that it is a human–AI collaboration, disclosed in the Epilogue.

## Features

- Navigation by sections (side menu): book, scenarios, reviews.
- Integrated audiobook, with speech synthesis (online service or the browser's local voice), voice and playback settings.
- Generative features "✨ Your review" and "🚀 Your ending", which call an AI API through a configurable endpoint (`/api/claude`).
- Search, day/night theme, reading mode, optional backgrounds and sound effects, reading progress and bookmarks.
- Automatic translation of the page, on request, into a long list of languages ("Translations" menu; the original language is Romanian).
- Keyboard shortcuts panel (opened with `?`).
- In-app legal pages: privacy/GDPR, cookies, a "Delete all local data" button.
- PWA: manifest and Service Worker (`sw.js`).

## User guide

Shortcuts shown by the application:

- `← →` previous / next page; `↑ ↓` scroll
- `Esc` closes any modal or panel
- `/` or `Ctrl+F` opens search
- `H` home; `D` toggles the day/night theme
- `A` opens the audiobook; `Space` play/pause audiobook
- `?` shows the list of shortcuts

Steps:

1. Read from the side menu: Prologue, Chapters 1-2, scenarios, reviews, Epilogue.
2. For the audiobook press `A` and use Play/Pause.
3. For another language open the "Translations" menu and choose the language.
4. "✨ Your review" and "🚀 Your ending" send your text to an AI API only when you act (and confirm).
5. Local data can be deleted with "🗑️ Delete all local data now" from the cookies/privacy page.

## Privacy and network

Local (`localStorage`/`sessionStorage`), according to the application's cookies page: visual and audio preferences (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` etc.), progress and bookmarks (`pi-progress`, `pi-bookmarks`), your own reviews and endings (`pi-reviews`, `pi-endings`, `c108entries`), the legal banner confirmation, and `nlSubs` (the addresses entered in the newsletter form are only saved locally by this code).

Third-party hosts contacted:

- `alexio.tf`: illustrative images (requested on load; the only external request without a user action) and sharing previews.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker to Azure Neural TTS): **only if you explicitly tick** "Azure Neural online voice" in the audiobook's voice panel (opt-in, off by default; the preference is kept in `pi_azure_tts`); then a test request is made and the text being read goes to the proxy for synthesis; without opt-in the browser's local voice is used and no request is sent to this service on load.
- `translate.googleapis.com`: only if you choose another language from "Translations"; the page text is sent to Google Translate.
- An AI API through `/api/claude` (the `claude-proxy.worker.js` proxy in the repository, to the Anthropic API): only if you use "Your review" / "Your ending".
- Google Fonts: verified in the audit (2026-10-10) — there is no request to `fonts.googleapis.com` / `fonts.gstatic.com`; the privacy page mentions them only conditionally.
- The "Next story" form (newsletter): the e-mail address is saved only locally, in `localStorage` (`nlSubs`); it is not sent anywhere and nobody will receive notifications based on it, although the confirmation message says "I'll let you know when something new appears".

The page hosted on GitHub Pages does not have the `/api/claude` route, so the generative features probably do not respond there unless `window.PI_API_ENDPOINT` is configured.

## Disclaimer

Fiction / speculation: the novel, the scenarios and the 108 reviews are works of fiction; the reviews are fictional, and the "active readers" values are simulated (marked "~simulated" on the page). The story uses the real names of the Artemis 2 crew members (Koch, Wiseman, Glover, Hansen) as characters in an entirely imaginary scenario; it is not affiliated with NASA, CSA, ESA or the crew. The texts generated through "Your review" / "Your ending" are produced by an AI model and may contain errors.

## Local / offline use

Download the repository and open `index.html`: the text of the book is included in the file and can be read without internet. Internet is needed for: the audiobook with online voice (optional; otherwise the local voice), translations, generative features and the images from alexio.tf. The Service Worker registers at the path `/sw.js` and works only over http(s), not from a local file.

## License

MIT — see the [LICENSE](LICENSE) file. Copyright is retained; the code and the text of the book may be used, copied, modified and redistributed while keeping the license notice.

## New features (v1.1.0)

- **Bookmarks and notes on passages** (the 📝 button in the top bar): you select a fragment from a page (book, scenarios, reviews), add a note; it is kept only in the browser (FFF.store), "Go to fragment" takes you to the page and paragraph in question, notes can be deleted and exported as Markdown. They are separate from the existing bookmarks (`pi-bookmarks`), which remain unchanged.
- **.fff.json backup** through the "Transparency" label (click on `v 1.1.0 · 2026-10-14` in "Terms & Privacy"): exports/imports (optionally password-encrypted) the progress, bookmarks, notes and your own reviews; it shows the stored keys and the declared network.
- Common kit (core, label, bundle). The existing search (Ctrl+K), audiobook and translation were not modified. Service Worker cache: pi-v15.
- The new texts are in ro, en, fr, it, es, pt, hu, de; the fr/it/es/pt/hu/de translations are automatic and not natively verified.
- Tests: `tests/fff-r8.test.mjs` (network blocked; the alexio.tf images, requested before as well, are excluded from the count; 1280 and 360 px, axe 0 violations with the dialog open).

## History / Changelog

### 1.1.0 — 2026-10-14
- New: bookmarks and notes on passages with Markdown export; .fff.json backup and transparency label (common kit). SW cache pi-v15.

### 1.0.0 — 2026-10-12
- The version and the date of the last update are shown in the application ("Terms & Privacy" window).

### 11 October 2026 (round 7)
- Fixed: the collapsed groups in the side menu (THE BOOK, SCENARIOS, ACTIONS etc.) hid the links only visually (`max-height:0`); they remained in the Tab order and under neighboring elements (a real click was intercepted by the group titles). Now the collapsed groups are `visibility:hidden` (with a transition), so they can no longer be focused or read by screen readers. Verified: a real click on "Prologue" after opening the group, 0 axe-core violations. Service Worker cache: pi-v14.
- Fixed: in reading view, the audiobook panel, the "Disclaimer & Terms" strip and the "New features" notification were in no ARIA landmark (axe-core `region`); they now have `role="region"`/`role="status"`.

### 11 October 2026 (round 6)
- Fixed: the 354 inline handlers (`onclick`, `onchange` etc.) were replaced by a delegated dispatcher (`data-on-*` + a single listener, no eval/Function; dynamic arguments pass through a whitelist of functions). Parity verified on 495 elements (0 differences). The CSP now has `script-src` with 16 sha256 hashes, without `'unsafe-inline'`.

### 11 October 2026
- Updated: the real Artemis 2 mission is no longer described as "scheduled": a test flight around the Moon, launched in April 2026, splashdown in the Pacific on 10 April 2026 (crew Wiseman, Glover, Koch, Hansen). Sources verified on 11.10.2026: NBC Palm Springs (10.04.2026), NASA. The fictional text of the novel was not modified.
- Fixed: the cinematic intro can be closed from the keyboard (the × button is now a `<button>`, plus the Escape key); the intro's 18.35 s duration remains an artistic decision of the author.
- Fixed: the book's images (served from alexio.tf) have a replacement with the alternative text when the network is missing, instead of a broken icon.
- Fixed: closed windows/overlays no longer remain focusable (visibility:hidden); `<footer>`, decorative `aria-hidden` elements, no positive `tabindex`; 0 axe-core violations at 1280 and 360 px.
- Added: CSP policy (meta) with the declared hosts (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); Service Worker cache pi-v12 (now pi-v13).
- Unchanged: the "reading now" counter remains simulated and labeled as such; the license/copyright was not modified (the author's decision).

## Author

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## English summary

"Printre inteligențe" is an interactive Romanian-language SF novel built around the NASA Artemis 2 mission, published as a web app: prologue, chapters, epilogue, 17 alternate scenarios and 108 fictional reviews, with an integrated audiobook. It stores preferences, reading progress and user texts in localStorage. It contacts alexio.tf (images), a TTS proxy on Cloudflare Workers, Google Translate (only if you pick a language) and an AI API endpoint (only for the generative features). Licence: MIT.

## Audit

Round 2 (2026-10-11): the test request to the TTS proxy on load was replaced by an explicit opt-in in the voice panel; the wordings "offline / no telemetry / runs entirely in the browser" in the header, FAQ, privacy page and EN summary were made more precise (the book text can be read offline; images, online voice, translation and AI features use external services); the fiction note about the real names of the crew members was completed on the page (RO and EN). License: MIT.

Audit: 2026-10-10 — the network claims in this README match the code (fetch to `tts-proxy.chiuta.workers.dev` — including a test request on load —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; images from `alexio.tf`). The application header says "offline-first, no telemetry", and the page contains absolute wordings ("runs entirely in the browser", in the English summary) that do not take these calls into account; the license was later set as MIT. Accessibility fixed (contrast in all themes, labels on select fields).
