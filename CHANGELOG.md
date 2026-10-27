# Jurnal de modificări — Printre inteligențe

## 2.2.0 — 2026-10-27

Anterior: v2.1.0. Recenzie 2 (2026-10-27).

- Harta ramificațiilor: cele 17 scenarii (`sub-a1`…`sub-e2`) se marchează cu ✓ după ce au stat ≥3 s în banda centrală a ecranului (`IntersectionObserver`, fără rețea). Familiile D și E (din Epilog), care nu puteau fi marcate, devin „parcurse” prin acest mecanism. Marcajul înseamnă „văzut pe ecran”, nu „citit” (nota din aplicație spune asta). Stare nouă `sub` în cheia locală existentă `printreinteligente.cale`, validată strict (chei `sub-[a-e]\d`, valori pozitive); „Șterge alegerile salvate” o curăță.
- Text nou în 8 limbi (fr/it/es/pt/de/hu asistate de AI, neverificate de vorbitori nativi). Hash-ul CSP al scriptului `pi-cale` recalculat.
- Test nou `tests/scenarii-vazute.test.mjs` (trecere rapidă nu marchează, ≥3 s marchează, persistență, date ostile/corupte, ștergere).
- README: EN/RO actualizate; la fr/it/es/pt/de/hu doar versiunea aliniată.

Nu s-a implementat: traduceri verificate natural; README fr/it/es/pt/de/hu cu conținut nou (doar versiunea).

## 2.1.0 — 2026-10-27

Anterior: v2.0.0. Recenzie 2026-10-27.

- Nou: „Harta ramificațiilor” în dialogul „Arborele poveștii” (🌳): începutul comun, cele 5 familii de scenarii (A–E) cu cele 17 scenarii și finalul comun; fiecare nod deschide pagina sau sare la scenariu; familiile A–C parcurse sunt marcate. Fără rețea.
- Nou: legătură explicită spre aplicația-companion NOMIA (https://chiuta.github.io/NOMIA/), deschisă într-o filă nouă doar la clic, cu mențiunea că e ficțiune și modele conceptuale.
- Texte noi în cele 8 limbi (fr/it/es/pt/de/hu asistate de AI, neverificate de vorbitori nativi).
- README (EN/RO): „Stare: stabil”, „Offline: parțial” cu explicația; test nou `tests/harta.test.mjs`.
- Tehnic: hash-ul CSP al scriptului `pi-cale` recalculat; cache Service Worker pi-v24; versiunea în `app.json`, `fff-info`, subsol.

Nu s-a implementat: harta nu urmărește vizitarea fiecărui sub-scenariu (progresul existent se păstrează doar pe pagini: A, B, C, Epilog), deci familiile D și E nu pot fi marcate ca parcurse; celelalte șase README-uri lingvistice nu au fost actualizate.
