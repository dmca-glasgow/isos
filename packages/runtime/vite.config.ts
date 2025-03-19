import preact from '@preact/preset-vite';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import wyw from '@wyw-in-js/vite';
// import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';
// import { viteSingleFile } from 'vite-plugin-singlefile';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // viteSingleFile(),
    svgr({
      include: '**/*.svg',
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
  server: {
    port: 1421,
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
    assetsInlineLimit: 5 * 1000 * 1000,
    chunkSizeWarningLimit: 5 * 1000 * 1000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/runtime.js`,
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name]-chunk.js`,
      },
    },
    // for MathJax
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
