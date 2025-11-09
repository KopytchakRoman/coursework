import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// --- ДОДАЙ ЦІ РЯДКИ ДЛЯ ВИПРАВЛЕННЯ __dirname ---
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- КІНЕЦЬ БЛОКУ ---

export default defineConfig({
  plugins: [react()],

  // Цей блок більше не потрібен, якщо файли .jsx/.js
  // esbuild: {
  //   loader: 'jsx',
  //   include: [
  //     'src/**/*.js',
  //     'src/**/*.jsx',
  //   ],
  // },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
