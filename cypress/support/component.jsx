import { mount } from 'cypress/react';
import { AuthProvider } from '../../src/context/AuthContext';
import { FavoritesProvider } from '../../src/context/FavoritesContext';
import '../../src/index.css';
import '@cypress/code-coverage/support';

Cypress.Commands.add('mount', (component, options = {}) => {
  const wrapped = (
    <AuthProvider>
      <FavoritesProvider>{component}</FavoritesProvider>
    </AuthProvider>
  );
  return mount(wrapped, options);
});
