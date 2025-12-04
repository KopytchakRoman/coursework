import React from 'react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('<Header />', () => {
  it('Гість: бачить кнопку Вхід', () => {
    window.localStorage.clear();

    cy.mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    cy.contains(/Вхід|Login|Sign In/i).should('exist');
  });

  it('Юзер: бачить своє ім’я та кнопку Вихід', () => {
    window.localStorage.setItem('user', JSON.stringify({ name: 'TestUser' }));
    window.localStorage.setItem('token', 'fake-jwt-token');

    cy.mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    cy.contains('TestUser').should('exist');
    cy.contains('Вихід').should('exist');
  });

  it('Навігація рендериться коректно', () => {
    cy.mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    cy.contains('Бренди').should('exist');
  });
});
