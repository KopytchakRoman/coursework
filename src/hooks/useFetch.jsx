import { useState, useEffect } from 'react';

function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      // 1. Створюємо унікальний ключ для кешу (наприклад, "cache_/perfumes" або "cache_/perfumes/1")
      const cacheKey = `perfumer_cache_${endpoint}`;

      // 2. ПЕРЕВІРКА КЕШУ: Одразу дістаємо дані з пам'яті браузера
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setData(JSON.parse(cachedData)); // Миттєво показуємо збережені парфуми!
        setLoading(false); // Вимикаємо лоадер, бо дані вже є
      } else {
        setLoading(true); // Лоадер потрібен тільки якщо кешу зовсім немає
      }

      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const fullUrl = `${baseUrl}/api/products${endpoint}`;

        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // 3. Оновлюємо екран НАЙСВІЖІШИМИ даними з бази даних
        setData(result);

        // 4. Оновлюємо кеш: ховаємо свіжі дані в пам'ять для наступного разу
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (e) {
        // 5. ЯКЩО НЕМАЄ ІНТЕРНЕТУ:
        // Якщо кешу немає (людина зайшла вперше без інтернету) - показуємо помилку.
        // Але якщо кеш є (cachedData), ми НЕ ставимо setError(e),
        // щоб сайт не ламався, адже парфуми вже успішно завантажилися з пам'яті!
        if (!cachedData) {
          setError(e);
        } else {
          console.warn(`Офлайн-режим. Використано кеш для: ${endpoint}`);
        }
      } finally {
        // Якщо кешу не було і запит пройшов/впав - вимикаємо лоадер
        if (!cachedData) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
