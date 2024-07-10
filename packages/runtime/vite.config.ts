import preact from '@preact/preset-vite';
import linaria from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

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
  ],
  server: {
    port: 1421,
  },
  build: {
    sourcemap: true,
    assetsInlineLimit: 5 * 1000 * 1000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/runtime.js`,
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name]-chunk.js`,
      },
    },
  },
}));
