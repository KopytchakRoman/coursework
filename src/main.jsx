import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// --- БЛОК РЕЄСТРАЦІЇ SERVICE WORKER ДЛЯ PWA ---
// Перевіряємо, чи підтримує браузер технологію Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // Вказуємо шлях до файлу воркера в папці public
      .then((registration) => {
        console.log('SW успішно зареєстровано! Сфера дії:', registration.scope);
      })
      .catch((error) => {
        console.log('Помилка реєстрації SW:', error);
      });
  });
}
