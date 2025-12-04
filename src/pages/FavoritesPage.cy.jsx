import React from 'react';
import FavoritesPage from './FavoritesPage';
import { MemoryRouter } from 'react-router-dom';

describe('<FavoritesPage />', () => {
  it('показує повідомлення, якщо список порожній', () => {
    window.localStorage.removeItem('favorites');

    cy.mount(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    cy.contains('Ваш список уподобань порожній').should('be.visible');
  });

  it('відображає додані парфуми', () => {
    const fakeFavs = [
      { id: '99', brand: 'Versace', name: 'Eros', imageUrl: '/eros.png' },
    ];
    window.localStorage.setItem('favorites', JSON.stringify(fakeFavs));

    cy.mount(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    cy.contains('ОБРАНІ АРОМАТИ').should('be.visible');
    cy.contains('Versace').should('be.visible');
    cy.contains('Eros').should('be.visible');
  });
});
