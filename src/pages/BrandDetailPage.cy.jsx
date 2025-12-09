import React from 'react';
import BrandDetailPage from './BrandDetailPage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('<BrandDetailPage />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products/perfumes', {
      statusCode: 200,
      body: [
        { id: '1', brand: 'Dior', name: 'Sauvage', imageUrl: '/img1.png' },
        { id: '2', brand: 'Chanel', name: 'No 5', imageUrl: '/img2.png' },
      ],
    }).as('getPerfumes');
  });

  it('відображає тільки парфуми обраного бренду', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/brands/Dior']}>
        <Routes>
          <Route path="/brands/:brandName" element={<BrandDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    cy.wait('@getPerfumes');

    cy.contains('h1', 'Dior').should('be.visible');
    cy.contains('Sauvage').should('be.visible');
    cy.contains('Chanel').should('not.exist');
  });
});
