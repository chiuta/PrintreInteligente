# Printre inteligențe

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 1.2.2 · **Última actualización:** 2026-10-19

Idiomas de la interfaz: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Novela de ciencia ficción interactiva sobre la misión Artemis 2, «reseñada por las estrellas y las hipercivilizaciones», con audiolibro integrado.

**En línea:** https://chiuta.github.io/PrintreInteligente/

![Captura de pantalla](screenshot.png)

## Qué es

«Printre inteligențe» es un libro vivo, publicado como aplicación web (un gran archivo `index.html`, más `sw.js`, `robots.txt`, `sitemap.xml` e imágenes de vista previa). La novela, inspirada en la misión Artemis 2 de la NASA (vuelo de prueba lunar, concluido el 10 de abril de 2026), sitúa a la tripulación en un escenario íntegramente ficticio, en el que un fallo técnico la obliga a un alunizaje de emergencia. Según la página, el libro contiene un Prólogo, dos capítulos, un Epílogo, 17 escenarios alternativos agrupados en 5 familias y 108 reseñas ficticias en 12 categorías (literarias, filosóficas, de lectores, de IA del futuro, NHI, hipercivilizaciones etc.). La página declara que es una obra de ficción, no afiliada a la NASA ni a la CSA, y que es una colaboración humano-IA, revelada en el Epílogo.

## Funciones

- Navegación por secciones (menú lateral): libro, escenarios, reseñas.
- Audiolibro integrado, con síntesis de voz (servicio en línea o voz local del navegador), ajustes de voces y reproducción.
- Funciones generativas «✨ Tu reseña» y «🚀 Tu final», que llaman a una API de IA mediante un endpoint configurable (`/api/claude`).
- Búsqueda, tema día/noche, modo de lectura, fondos y efectos de sonido opcionales, progreso de lectura y marcadores.
- Traducción automática de la página, a elección, a una larga lista de idiomas (menú «Traducciones»; el idioma original es el rumano).
- Panel de atajos de teclado (se abre con `?`).
- Páginas legales en la aplicación: privacidad/RGPD, cookies, botón «Borrar todos los datos locales».
- PWA: manifiesto y Service Worker (`sw.js`).

## Manual de uso

Atajos mostrados por la aplicación:

- `← →` página anterior / siguiente; `↑ ↓` desplazamiento
- `Esc` cierra cualquier ventana modal o panel
- `/` o `Ctrl+F` abre la búsqueda
- `H` inicio; `D` alterna el tema día/noche
- `A` abre el audiolibro; `Espacio` reproducir/pausa del audiolibro
- `?` muestra la lista de atajos

Pasos:

1. Lee desde el menú lateral: Prólogo, Capítulos 1-2, escenarios, reseñas, Epílogo.
2. Para el audiolibro pulsa `A` y usa Reproducir/Pausa.
3. Para otro idioma abre el menú «Traducciones» y elige el idioma.
4. «✨ Tu reseña» y «🚀 Tu final» envían tu texto a una API de IA solo cuando actúas (y confirmas).
5. Los datos locales se pueden borrar con «🗑️ Borrar ahora todos los datos locales» desde la página de cookies/privacidad.

## Privacidad y red

Local (`localStorage`/`sessionStorage`), según la página de cookies de la aplicación: preferencias visuales y de audio (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` etc.), progreso y marcadores (`pi-progress`, `pi-bookmarks`), reseñas y finales propios (`pi-reviews`, `pi-endings`, `c108entries`), confirmación del aviso legal, y `nlSubs` (las direcciones introducidas en el formulario de la newsletter solo se guardan localmente con este código).

Hosts de terceros contactados:

- `alexio.tf`: imágenes ilustrativas (solicitadas al cargar; la única solicitud externa sin acción del usuario) y vistas previas para compartir.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker hacia Azure Neural TTS): **solo si marcas explícitamente** «Voz en línea Azure Neural» en el panel de voces del audiolibro (opt-in, desactivado por defecto; la preferencia se guarda en `pi_azure_tts`); entonces se hace una solicitud de prueba y el texto leído sale hacia el proxy para la síntesis; sin opt-in se usa la voz local del navegador y al cargar no sale ninguna solicitud hacia este servicio.
- `translate.googleapis.com`: solo si eliges otro idioma en «Traducciones»; el texto de la página se envía a Google Translate.
- Una API de IA mediante `/api/claude` (el proxy `claude-proxy.worker.js` del repositorio, hacia la API de Anthropic): solo si usas «Tu reseña» / «Tu final».
- Google Fonts: verificado en la auditoría (2026-10-10) — no hay ninguna solicitud a `fonts.googleapis.com` / `fonts.gstatic.com`; la página de privacidad solo los menciona de forma condicional.
- El formulario «Próxima historia» (newsletter): la dirección de correo se guarda solo localmente, en `localStorage` (`nlSubs`); no se envía a ninguna parte y nadie recibirá notificaciones basadas en ella, aunque el mensaje de confirmación dice «Te aviso cuando aparezca algo nuevo».

La página alojada en GitHub Pages no tiene la ruta `/api/claude`, por lo que las funciones generativas probablemente no respondan allí a menos que se configure `window.PI_API_ENDPOINT`.

## Aviso

Ficción / especulación: la novela, los escenarios y las 108 reseñas son obras de ficción; las reseñas son ficticias y los valores de «lectores activos» son simulados (marcados «~simulado» en la página). La historia usa los nombres reales de los miembros de la tripulación de Artemis 2 (Koch, Wiseman, Glover, Hansen) como personajes en un escenario enteramente imaginario; no está afiliada a la NASA, la CSA, la ESA ni a la tripulación. Los textos generados mediante «Tu reseña» / «Tu final» los produce un modelo de IA y pueden contener errores.

## Ejecución local / sin conexión

Descarga el repositorio y abre `index.html`: el texto del libro está incluido en el archivo y se lee sin internet. Necesitan internet: el audiolibro con voz en línea (opcional; si no, la voz local), las traducciones, las funciones generativas y las imágenes de alexio.tf. El Service Worker se registra en la ruta `/sw.js` y funciona solo sobre http(s), no desde un archivo local.

## Licencia

MIT — véase el archivo [LICENSE](LICENSE). Los derechos de autor se conservan; el código y el texto del libro pueden usarse, copiarse, modificarse y redistribuirse conservando el aviso de licencia.

## Novedades (v1.1.0)

- **Marcadores y notas en pasajes** (botón 📝 de la barra superior): seleccionas un fragmento de una página (libro, escenarios, reseñas) y añades una nota; se guarda solo en el navegador (FFF.store), «Ir al fragmento» te lleva a la página y al párrafo en cuestión, las notas se pueden borrar y exportar como Markdown. Son independientes de los marcadores existentes (`pi-bookmarks`), que no cambian.
- **Copia de seguridad .fff.json** mediante la etiqueta «Transparencia» (clic en `v 1.1.0 · 2026-10-14` en «Términos y privacidad»): exporta/importa (opcionalmente cifrados con contraseña) el progreso, los marcadores, las notas y las reseñas propias; muestra las claves almacenadas y la red declarada.
- Kit común (core, label, bundle). La búsqueda (Ctrl+K), el audiolibro y la traducción existentes no se han modificado. Caché del Service Worker: pi-v15.
- Los textos nuevos están en ro, en, fr, it, es, pt, hu, de; las traducciones fr/it/es/pt/hu/de son automáticas y no verificadas por nativos.
- Pruebas: `tests/fff-r8.test.mjs` (red bloqueada; las imágenes de alexio.tf, solicitadas también antes, se excluyen del recuento; 1280 y 360 px, axe 0 infracciones con el cuadro de diálogo abierto).

## Historial / Changelog

### 1.1.0 — 2026-10-14
- Nuevo: marcadores y notas en pasajes con exportación a Markdown; copia de seguridad .fff.json y etiqueta de transparencia (kit común). Caché SW pi-v15.

### 1.0.0 — 2026-10-12
- La versión y la fecha de la última actualización se muestran en la aplicación (ventana «Términos y privacidad»).

### 11 de octubre de 2026 (ronda 7)
- Corregido: los grupos contraídos del menú lateral (EL LIBRO, ESCENARIOS, ACCIONES etc.) ocultaban los enlaces solo visualmente (`max-height:0`); seguían en el orden del Tab y bajo los elementos vecinos (clic real interceptado por los títulos de los grupos). Ahora los grupos contraídos son `visibility:hidden` (con transición), por lo que ya no pueden recibir el foco ni ser leídos por los lectores de pantalla. Verificado: clic real en «Prólogo» tras abrir el grupo, 0 infracciones axe-core. Caché del Service Worker: pi-v14.
- Corregido: en la vista de lectura, el panel del audiolibro, la banda «Disclaimer & Términos» y la notificación «Novedades» no estaban en ningún punto de referencia ARIA (axe-core `region`); ahora tienen `role="region"`/`role="status"`.

### 11 de octubre de 2026 (ronda 6)
- Corregido: los 354 manejadores en línea (`onclick`, `onchange` etc.) se sustituyeron por un despachador delegado (`data-on-*` + un solo listener, sin eval/Function; los argumentos dinámicos pasan por una lista blanca de funciones). Paridad verificada en 495 elementos (0 diferencias). La CSP tiene ahora `script-src` con 16 hashes sha256, sin `'unsafe-inline'`.

### 11 de octubre de 2026
- Actualizado: la misión real Artemis 2 ya no se describe como «programada»: vuelo de prueba alrededor de la Luna, lanzado en abril de 2026, amerizaje en el Pacífico el 10 de abril de 2026 (tripulación Wiseman, Glover, Koch, Hansen). Fuentes verificadas el 11.10.2026: NBC Palm Springs (10.04.2026), NASA. El texto ficticio de la novela no se modificó.
- Corregido: la introducción cinematográfica se puede cerrar con el teclado (el botón × es ahora un `<button>`, más la tecla Escape); la duración de 18,35 s de la introducción sigue siendo una decisión artística del autor.
- Corregido: las imágenes del libro (servidas desde alexio.tf) tienen un sustituto con el texto alternativo cuando falta la red, en lugar de un icono roto.
- Corregido: las ventanas/superposiciones cerradas ya no pueden recibir el foco (visibility:hidden); `<footer>`, elementos decorativos `aria-hidden`, sin `tabindex` positivo; 0 infracciones axe-core a 1280 y 360 px.
- Añadido: política CSP (meta) con los hosts declarados (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev); caché del Service Worker pi-v12 (ahora pi-v13).
- Sin cambios: el contador «leen ahora» sigue siendo simulado y se etiqueta como tal; la licencia/los derechos de autor no se modificaron (decisión del autor).

## Autor

Alexio — Alexandru-Ionuț Chiuță, contacto: alexio@trom.tf

## Resumen

«Printre inteligențe» es una novela de ciencia ficción interactiva en rumano, construida en torno a la misión Artemis 2 de la NASA y publicada como aplicación web: prólogo, capítulos, epílogo, 17 escenarios alternativos y 108 reseñas ficticias, con un audiolibro integrado. Guarda preferencias, progreso de lectura y textos del usuario en localStorage. Contacta con alexio.tf (imágenes), un proxy TTS en Cloudflare Workers, Google Translate (solo si eliges un idioma) y un punto final de API de IA (solo para las funciones generativas). Licencia: MIT.

## Auditoría

Ronda 2 (2026-10-11): la solicitud de prueba al proxy TTS al cargar se sustituyó por un opt-in explícito en el panel de voces; las formulaciones «sin conexión / sin telemetría / se ejecuta íntegramente en el navegador» de la cabecera, las FAQ, la página de privacidad y el resumen EN se precisaron (el texto del libro se lee sin conexión; las imágenes, la voz en línea, la traducción y las funciones de IA usan servicios externos); la nota de ficción sobre los nombres reales de los miembros de la tripulación se completó en la página (RO y EN). Licencia: MIT.

Auditoría: 2026-10-10 — las afirmaciones de red de este README coinciden con el código (fetch hacia `tts-proxy.chiuta.workers.dev` — incluida una solicitud de prueba al cargar —, `translate.googleapis.com`, `window.PI_API_ENDPOINT`; imágenes de `alexio.tf`). La cabecera de la aplicación dice «offline-first, sin telemetría», y la página contiene formulaciones absolutas («se ejecuta íntegramente en el navegador», en el resumen en inglés) que no tienen en cuenta estas llamadas; la licencia se fijó después como MIT. Accesibilidad corregida (contraste en todos los temas, etiquetas en los campos de selección).
