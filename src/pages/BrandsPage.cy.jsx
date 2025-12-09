import React from 'react';
import BrandsPage from './BrandsPage';
import { MemoryRouter } from 'react-router-dom';

describe('<BrandsPage />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products/brands', {
      statusCode: 200,
      body: {
        A: ['Armani', 'Azzaro'],
        C: ['Chanel', 'Creed'],
      },
    }).as('getBrands');
  });

  it('відображає популярні бренди (статичні)', () => {
    cy.mount(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );
    cy.contains('Популярні бренди').should('be.visible');
    cy.get('img[alt="Dior"]').should('exist');
  });

  it('відображає алфавітний список після завантаження', () => {
    cy.mount(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );
    cy.wait('@getBrands');
    cy.contains('Armani').should('be.visible');
    cy.contains('Chanel').should('be.visible');
  });
});
