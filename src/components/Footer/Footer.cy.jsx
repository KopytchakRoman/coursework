import React from 'react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('<Footer />', () => {
  it('рендериться без помилок', () => {
    cy.mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    cy.contains('Perfumer').should('be.visible');
    cy.contains('Всі права захищено').should('be.visible');
  });

  it('містить посилання на соцмережі', () => {
    cy.mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    cy.contains('a', 'FB')
      .should('have.attr', 'href')
      .and('include', 'facebook');
  });
});
