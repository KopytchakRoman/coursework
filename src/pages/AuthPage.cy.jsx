import React from 'react';
import AuthPage from './AuthPage';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { MemoryRouter } from 'react-router-dom';

describe('<AuthPage /> ', () => {
  const mountPage = (loginResponse = { success: false }) => {
    const authValue = {
      isLoggedIn: false,
      user: null,
      login: cy.stub().as('loginStub').resolves(loginResponse),
      register: cy.stub().as('registerStub').resolves({ success: false }),
      logout: () => {},
    };

    const favValue = { favorites: [], isFavorite: () => false };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={authValue}>
          <FavoritesContext.Provider value={favValue}>
            <AuthPage />
          </FavoritesContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('1. Базовий рендер та перемикання вкладок', () => {
    mountPage();
    cy.contains('button', 'Реєстрація').should('be.visible');
    cy.contains('button', 'Вхід').click();
    cy.contains('button', 'Увійти').should('be.visible');
  });

  it('2. Валідація: Пусті поля (Login)', () => {
    mountPage();
    cy.contains('button', 'Вхід').click();
    cy.contains('button', 'Увійти').click();
    cy.contains('Будь ласка, заповніть всі поля').should('be.visible');
  });

  it('3. Логіка: Спроба входу з помилкою (Failed Login)', () => {
    const errorResponse = { success: false, message: 'Невірний пароль' };
    mountPage(errorResponse);

    cy.contains('button', 'Вхід').click();

    cy.get('#email').type('test@error.com');
    cy.get('#password').type('wrongpass');

    cy.contains('button', 'Увійти').click();

    cy.contains('Невірний пароль').should('be.visible');
  });
});
