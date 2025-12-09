import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('<ProtectedRoute />', () => {
  it('Гість: перенаправляє на сторінку входу', () => {
    const mockAuth = { isLoggedIn: false };

    cy.mount(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route path="/auth" element={<h1>Сторінка Входу</h1>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h1>Секретна інфа</h1>} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    cy.contains('Сторінка Входу').should('be.visible');
    cy.contains('Секретна інфа').should('not.exist');
  });

  it('Користувач: пускає на захищену сторінку', () => {
    const mockAuth = { isLoggedIn: true };

    cy.mount(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h1>Секретна інфа</h1>} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    cy.contains('Секретна інфа').should('be.visible');
  });
});
