import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    pool: 'threads',
    exclude: [
      ...configDefaults.exclude,
      '**/_old/**',
      'unified-latex-forks/**',
    ],
  },
});
