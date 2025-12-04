import React from 'react';
import AboutPage from './AboutPage';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { MemoryRouter } from 'react-router-dom';

describe('<AboutPage />', () => {
  it('відображає сторінку для авторизованого користувача', () => {
    const mockAuthValue = {
      isLoggedIn: true,
      user: { name: 'Роман' },
      logout: () => {},
    };

    const mockFavoritesValue = { favorites: [], isFavorite: () => false };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <FavoritesContext.Provider value={mockFavoritesValue}>
            <AboutPage />
          </FavoritesContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Про нас').should('be.visible');
    cy.contains('Вхід/Реєстрація').should('not.exist');
    cy.contains('Вітаємо, Роман!').should('be.visible');
  });
});
