// sw.js
const CACHE_NAME = 'crystal-game-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css', // добавьте сюда все ваши файлы
  './script.js',
  './assets/icon-192.png',
  './assets/icon-512.png'
  // перечислите все картинки, звуки и скрипты игры
];

// Установка: кэшируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Активация: удаляем старые кэши при обновлении
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(name => {
        if (name !== CACHE_NAME) return caches.delete(name);
      })
    ))
  );
});

// Перехват запросов: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
