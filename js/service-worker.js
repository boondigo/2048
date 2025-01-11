const CACHE_NAME = '2048-cache-v1';
const urlsToCache = [
  '/2048/',
  '/2048/index.html',
  '/2048/style/main.css',
  '/2048/js/virtual_keyboard.js',
  '/2048/js/keyboard_input_manager.js',
  '/2048/js/html_actuator.js',
  '/2048/js/grid.js',
  '/2048/js/tile.js',
  '/2048/js/local_storage_manager.js',
  '/2048/js/game_manager.js',
  '/2048/js/application.js',
  '/2048/icons/icon-192x192.png',
  '/2048/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .catch(error => {
      console.error('Failed to activate:', error);
    })
  );
});