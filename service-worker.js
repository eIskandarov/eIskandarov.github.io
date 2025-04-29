const cacheName = 'worker-cache-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './images/favicon/android-chrome-192x192.png',
  './images/dice-1.png',
  './images/dice-2.png',
  './images/dice-3.png',
  './images/dice-4.png',
  './images/dice-5.png',
  './images/dice-6.png',
];

console.log('Service Worker scope:', self.location);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches
        .match('./index.html')
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
