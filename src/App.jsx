import React from 'react';
// 1. BrowserRouter, Routes, та Route імпортовані
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Імпортуємо всі твої сторінки
import HomePage from './pages/HomePage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import PerfumeDetailPage from './pages/PerfumeDetail.jsx';

function App() {
  return (
    // 3. <BrowserRouter> обгортає всі маршрути
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        <Route path="*" element={<h1>404 | Сторінку не знайдено</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
