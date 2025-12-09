import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  {
    files: ['**/*.cy.jsx', '**/*.cy.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        cy: true,
        Cypress: true,
      },
    },
  },

  {
    files: ['vite.config.js', 'cypress.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
];
