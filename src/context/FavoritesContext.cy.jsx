import React from 'react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

const TestComponent = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const mockPerfume = { id: '1', name: 'Dior' };

  return (
    <div>
      <p>Count: {favorites.length}</p>
      <p>Is Fav: {isFavorite('1').toString()}</p>
      <button onClick={() => toggleFavorite(mockPerfume)}>Toggle</button>
    </div>
  );
};

describe('FavoritesContext', () => {
  it('додає та видаляє товари зі списку', () => {
    window.localStorage.clear();

    cy.mount(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    cy.contains('Count: 0').should('be.visible');
    cy.contains('Is Fav: false').should('be.visible');

    cy.contains('Toggle').click();
    cy.contains('Count: 1').should('be.visible');
    cy.contains('Is Fav: true').should('be.visible');

    cy.contains('Toggle').click();
    cy.contains('Count: 0').should('be.visible');
  });
});
