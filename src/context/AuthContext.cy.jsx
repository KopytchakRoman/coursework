import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="user-name">{user ? user.name : 'Guest'}</p>
      <button onClick={() => login('test@test.com', '123456')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('дозволяє увійти та вийти', () => {
    cy.intercept('POST', '**/api/users/login', {
      statusCode: 200,
      body: { token: 'fake-jwt', name: 'Tester', email: 'test@test.com' },
    }).as('loginRequest');

    cy.mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    cy.get('[data-testid="user-name"]').should('contain', 'Guest');

    cy.contains('Login').click();
    cy.wait('@loginRequest');

    cy.get('[data-testid="user-name"]').should('contain', 'Tester');

    cy.contains('Logout').click();
    cy.get('[data-testid="user-name"]').should('contain', 'Guest');
  });
});
