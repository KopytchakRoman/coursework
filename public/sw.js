const CACHE_NAME = 'perfumer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/assets/lupa.png',
  // Додай сюди основні статичні ресурси
];

// Встановлення воркера та кешування ресурсів
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Обробка запитів (Стратегія: спочатку мережа, якщо нема — кеш)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
