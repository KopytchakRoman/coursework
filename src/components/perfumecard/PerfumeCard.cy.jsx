import React from 'react';
import PerfumeCard from './PerfumeCard';
import { MemoryRouter } from 'react-router-dom';

describe('<PerfumeCard />', () => {
  const mockPerfume = {
    id: '1',
    brand: 'Chanel',
    name: 'Coco Mademoiselle',
    type: 'Eau de Parfum',
    imageUrl: 'https://via.placeholder.com/150',
  };

  it('відображає дані товару', () => {
    cy.mount(
      <MemoryRouter>
        <PerfumeCard {...mockPerfume} />
      </MemoryRouter>
    );

    cy.contains('Chanel').should('be.visible');
    cy.contains('Coco Mademoiselle').should('be.visible');

    cy.get(`img[alt="${mockPerfume.brand} ${mockPerfume.name}"]`).should(
      'have.attr',
      'src',
      mockPerfume.imageUrl
    );
  });

  it('відображає пусте серце для незалогіненого юзера', () => {
    window.localStorage.clear();

    cy.mount(
      <MemoryRouter>
        <PerfumeCard {...mockPerfume} />
      </MemoryRouter>
    );

    cy.get('button img')
      .should('have.attr', 'src')
      .and('include', 'heart-outline');
  });
});
