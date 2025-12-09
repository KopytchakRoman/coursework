import React from 'react';
import PerfumeDetailPage from './PerfumeDetail';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('<PerfumeDetailPage />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products/perfumes', {
      statusCode: 200,
      body: [
        {
          id: '123',
          brand: 'Tom Ford',
          name: 'Tobacco Vanille',
          imageUrl: '/tf.png',
          description: 'Дуже класний запах',
          notes: [{ name: 'Ваніль', value: 80, color: '#fff' }],
        },
      ],
    }).as('getPerfumes');
  });

  it('відображає деталі парфуму за ID', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/perfume/123']}>
        <Routes>
          <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    cy.wait('@getPerfumes');

    cy.contains('Tom Ford').should('not.exist');
    cy.contains('h1', 'Tobacco Vanille').should('be.visible');
    cy.contains('Дуже класний запах').should('be.visible');
    cy.contains('Ваніль').should('be.visible');
  });

  it('показує помилку, якщо парфум не знайдено', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/perfume/999']}>
        <Routes>
          <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    cy.wait('@getPerfumes');
    cy.contains('не знайдено').should('be.visible');
  });
});
