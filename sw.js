/*
  ====================================================================
  Autor: Alexandru-Ionuț Chiuță (Alexio)
  LICENȚĂ: TRADE-FREE + CC0 1.0 — domeniu public, fără troc (TROM · trom.tf)
  https://creativecommons.org/publicdomain/zero/1.0/
  Sprijin: Patreon https://www.patreon.com/c/alexio_tf · Buy Me a Coffee https://buymeacoffee.com/echo.of.the.strings
  ====================================================================
*/

/* Printre inteligențe — Service Worker v11
   DOCUMENT = network-first (o reîncărcare aduce mereu ultima versiune; evită „cache zombi").
   Restul asset-urilor = cache-first cu populare leneșă. Include kill-switch. */
const CACHE = 'pi-v11';
const SHELL = ['/'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* kill-switch: pagina poate cere SW-ului să se autodistrugă */
self.addEventListener('message', e => {
  if (e.data === 'sw-unregister') {
    self.registration.unregister()
      .then(() => caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))));
  }
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* DOCUMENT (navigare sau index.html) → NETWORK-FIRST, fallback la cache doar offline. */
  if (req.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('/', copy));
        }
        return res;
      }).catch(() => caches.match('/').then(r => r || caches.match(req)))
    );
    return;
  }

  /* Restul (asset-uri proprii) → CACHE-FIRST cu populare leneșă. */
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res && res.status === 200 && res.type !== 'opaque') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('/')))
  );
});
