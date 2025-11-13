import preact from '@preact/preset-vite';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
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
      include: [
        'node_modules/@mathjax/**',
        // 'node_modules/speech-rule-engine/cjs/**',
      ],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  // clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
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
    target: 'es2022',
    sourcemap: true,
    // for MathJax
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    pool: 'threads',
    exclude: [
      ...configDefaults.exclude,
      '**/_old/**',
      'unified-latex-forks/**',
    ],
  },
});
