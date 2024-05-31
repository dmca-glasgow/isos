/// <reference types="vitest" />
import preact from '@preact/preset-vite';
import linaria from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    svgr({
      include: '**/*.svg',
    }),
    linaria({
      include: ['**/*.tsx'],

      // https://github.com/callstack/linaria/issues/1379#issuecomment-2020805137
      overrideContext: (context) => ({
        ...context,
        $RefreshSig$: () => () => () => {},
      }),
    }),
    preact({
      prefreshEnabled: false,
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      '**/_old/**',
      'packages/unified-latex-*/**',
    ],
    // globals: true,
    // environment: 'jsdom',
    // browser: {
    //   enabled: true,
    //   name: 'chromium',
    //   provider: 'playwright',
    //   fileParallelism: false,
    // },
  },
}));
