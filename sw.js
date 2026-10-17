// Daily Take service worker: makes the app open offline.
// The page and the manifest are network-first, so updates arrive on the next launch with nothing to manage.
// Bump CACHE whenever the manifest changes, so phones install this worker again and drop the old cache.
const CACHE = 'daily-take-v3';
const SHELL = [
  './',
  './index.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache (GitHub Pages sends max-age=600) so precache gets fresh copies.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('daily-take-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first, keeping a copy for offline; falls back to the cache when there's no connection.
function networkFirst(req, cacheKey) {
  return fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(cacheKey || req, copy)); }
    return res;
  }).catch(() => caches.match(cacheKey || req));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // The page itself.
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req, './index.html'));
    return;
  }

  // The manifest must reach Chrome fresh, or new screenshots/description never show in the install sheet.
  // 'no-cache' makes the browser check with the server instead of reusing its HTTP-cached copy (max-age=600 on Pages).
  if (url.pathname.endsWith('.webmanifest') || req.destination === 'manifest') {
    e.respondWith(networkFirst(new Request(req, { cache: 'no-cache' })));
    return;
  }

  // Cache first for icons.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
