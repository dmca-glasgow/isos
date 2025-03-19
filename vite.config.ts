/// <reference types="vitest" />
import preact from '@preact/preset-vite';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';
// import { viteSingleFile } from 'vite-plugin-singlefile';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // viteSingleFile(),
    svgr({
      include: '**/assets/*.svg',
    }),
    preact({
      prefreshEnabled: false,
    }),
    prismjs({
      languages: ['latex'],
    }),
    wyw(),

    // For MathJax
    {
      ...alias({
        entries: [
          {
            find: /mjs\/output\/svg\/DefaultFont.js$/,
            replacement: 'components/mjs/output/svg/nofont.js',
          },
        ],
      }),
      enforce: 'pre',
    },
    commonjs({
      include: ['node_modules/mathjax-*/**'],
    }),
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
    hmr: host
      ? {
          protocol: 'ws',
          host: host,
          port: 1430,
        }
      : undefined,
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    sourcemap: true,
    // for MathJax
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      '**/_old/**',
      'packages/unified-latex-*/**',
    ],
  },
});
