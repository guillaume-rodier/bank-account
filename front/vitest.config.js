import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],  // 👈 configuration globale exécutée avant tous les tests
    include: ['tests/**/*.test.js'], // 👈 ne cherche que les fichiers test
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
