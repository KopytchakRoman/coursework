import React from 'react';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

describe('<NotFoundPage />', () => {
  it('відображає помилку 404', () => {
    cy.mount(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    cy.contains('404').should('be.visible');
    cy.contains('Сторінку не знайдено').should('be.visible');
    cy.contains('a', 'Повернутись на головну').should('have.attr', 'href', '/');
  });
});
