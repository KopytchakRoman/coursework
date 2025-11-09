import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import PerfumeDetailPage from './pages/PerfumeDetail.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import BrandDetailPage from './pages/BrandDetailPage.jsx';

import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <FavoritesProvider>
      <AuthProvider>
        {' '}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:brandName" element={<BrandDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </FavoritesProvider>
  );
}

export default App;
