import preact from '@preact/preset-vite';
import linaria from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';
import svgr from 'vite-plugin-svgr';

// import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    svgr({
      include: '**/*.svg',
    }),
    linaria({
      include: ['**/*.tsx'],
    }),
    preact({
      prefreshEnabled: false,
    }),
    prismjs({
      languages: ['latex'],
    }),
    // {
    //   name: 'inject',
    //   transformIndexHtml() {
    //     return [
    //       {
    //         tag: 'script',
    //         attrs: {
    //           src: mathjaxPath,
    //           async: true,
    //         },
    //       },
    //     ];
    //   },
    // },
  ],
  server: {
    port: 1421,
  },
  build: {
    sourcemap: true,
    assetsInlineLimit: 5 * 1000 * 1000,
    rollupOptions: {
      // input: {
      //   index: fileURLToPath(new URL('index.html', import.meta.url)),
      //   runtime: fileURLToPath(new URL('src/main.tsx', import.meta.url)),
      //   // mathjax: fileURLToPath(new URL(mathjaxPath, import.meta.url)),
      // },
      // external: [
      //   fileURLToPath(
      //     new URL(
      //       mathjaxPath,
      //       import.meta.url,
      //     ),
      //   ),
      // ],
      output: {
        entryFileNames: `assets/runtime.js`,
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name]-chunk.js`,
      },
    },
  },
}));
