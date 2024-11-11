/// <reference types="vitest" />
import preact from '@preact/preset-vite';
import linaria from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

// const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    svgr({
      include: '**/assets/*.svg',
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
    prismjs({
      languages: ['latex'],
    }),
  ],
  // 1. prevent vite from obscuring rust errors
  // clearScreen: false,
  server: {
    // host: host || false,
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
    // hmr: host
    //   ? {
    //       protocol: 'ws',
    //       host: host,
    //       port: 1430,
    //     }
    //   : undefined,
  },
  devSourcemap: true,
  css: {
    devSourcemap: true,
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
  },
}));
