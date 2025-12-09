import React from 'react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('<HomePage />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products/perfumes', {
      statusCode: 200,
      body: [
        {
          _id: '101',
          name: 'Test Perfume 1',
          brand: 'Test Brand',
          imageUrl: '/img1.png',
        },
        {
          _id: '102',
          name: 'Test Perfume 2',
          brand: 'Test Brand',
          imageUrl: '/img2.png',
        },
      ],
    }).as('getPerfumes');
  });

  it('відображає парфуми після завантаження', () => {
    cy.mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    cy.wait('@getPerfumes');

    cy.contains('Test Perfume 1').should('be.visible');
    cy.contains('Test Perfume 2').should('be.visible');
  });

  it('відображає поле пошуку', () => {
    cy.mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Пошук...');
  });
});
