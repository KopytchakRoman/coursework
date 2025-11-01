// src/main.jsx (Виправлений код)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* <-- Тепер тут лише <App /> */}
  </StrictMode>
);
