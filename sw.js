const APP_VERSION = '0.2.1';
const CACHE_NAME = `tid-app-${APP_VERSION}`;
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './version.json',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = (await caches.keys()).filter(key => key.startsWith('tid-app-'));
    const keep = new Set(keys.slice(-1).concat(CACHE_NAME));
    await Promise.all(keys.filter(key => !keep.has(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate' || url.pathname.endsWith('/version.json')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(event.request, {cache:'no-store'});
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match(event.request)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    const refresh = fetch(event.request).then(async response => {
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
      }
      return response;
    }).catch(() => null);
    return cached || refresh || Response.error();
  })());
});
