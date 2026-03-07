const CACHE_NAME = 'perfumer-pwa-v3'; // Змінили версію, щоб браузер точно оновив воркер

// Кешуємо тільки саму базу
const CORE_ASSETS = ['/', '/index.html', '/manifest.json'];

// 1. Встановлення Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Примусово змушуємо новий воркер активуватися негайно
  self.skipWaiting();
});

// 2. Активація та видалення старого зламаного кешу
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Одразу беремо під контроль усі відкриті вкладки сайту
  self.clients.claim();
});

// 3. Перехоплення запитів (Найважливіша частина)
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // ІГНОРУЄМО: запити до бази даних (бекенду), POST-запити та розширення браузера.
  // Завдяки цьому твої парфуми завжди будуть вантажитися з сервера, а не видавати помилку.
  // Спеціальна стратегія для API (бази даних): Спершу мережа, потім кеш
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Якщо інтернет є - зберігаємо свіжу копію в окремий кеш і віддаємо дані
          return caches.open('perfumer-api-cache-v1').then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Якщо інтернету немає (помилка fetch) - шукаємо останні дані в кеші
          return caches.match(request);
        })
    );
    return;
  }

  // ДЛЯ СТАТИКИ (CSS, JS, Картинки): Стратегія "Кеш, з фоновим оновленням"
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Якщо файл є в кеші - віддаємо його миттєво
      if (cachedResponse) {
        // Фоново йдемо в інтернет і оновлюємо кеш, щоб при наступному заході були свіжі дані
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(request, networkResponse.clone()));
            }
          })
          .catch(() => {}); // Ігноруємо помилки, якщо інтернету немає

        return cachedResponse;
      }

      // Якщо файлу немає в кеші - йдемо в інтернет і запам'ятовуємо його
      return fetch(request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Заглушка на випадок повного офлайну
          return new Response("Офлайн режим. Немає зв'язку.", {
            status: 503,
            headers: new Headers({ 'Content-Type': 'text/plain' }),
          });
        });
    })
  );
});
