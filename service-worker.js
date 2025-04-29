const cacheName = "worker-cache-v1.5";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./images/favicon/android-chrome-192x192.png",
  "./images/dice-1.png",
  "./images/dice-2.png",
  "./images/dice-3.png",
  "./images/dice-4.png",
  "./images/dice-5.png",
  "./images/dice-6.png",
  "./sounds/d1/d1_01.wav",
  "./sounds/d1/d1_02.wav",
  "./sounds/d1/d1_03.wav",
  "./sounds/d1/d1_04.wav",
  "./sounds/d1/d1_05.wav",
  "./sounds/d1/d1_06.wav",
  "./sounds/dice-roll/dice-roll_01.wav",
  "./sounds/dice-roll/dice-roll_02.wav",
  "./sounds/dice-roll/dice-roll_03.wav",
  "./sounds/hold/hold_01.wav",
  "./sounds/hold/hold_02.wav",
  "./sounds/hold/hold_03.wav",
  "./sounds/new-game/new-game_01.wav",
  "./sounds/new-game/new-game_02.wav",
  "./sounds/new-game/new-game_03.wav",
  "./sounds/winner/winner_01.wav",
  "./sounds/winner/winner_02.wav",
  "./sounds/winner/winner_03.wav",
];

// console.log('Service Worker scope:', self.location);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches
        .match("./index.html")
        .then((cached) => cached || fetch(event.request)),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
