import React from 'react';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products/perfumes', {
      statusCode: 200,
      body: [],
    }).as('getPerfumes');

    cy.intercept('GET', '**/api/products/brands', { body: {} });
  });

  it('успішно рендерить головну сторінку', () => {
    window.history.pushState({}, '', '/');

    cy.mount(<App />);

    cy.contains('ЗНАЙДИ САМЕ ТЕ').should('be.visible');
    cy.contains('Вхід/Реєстрація').should('be.visible');
  });
});
