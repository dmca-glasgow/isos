import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import wyw from '@wyw-in-js/vite';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    preact(),
    wyw({
      include: ['**/*.tsx'],
    }),
  ],
  server: {
    port: 1421,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/runtime.js`,
        assetFileNames: `assets/runtime.[ext]`,
        chunkFileNames: `assets/chunk-[name].js`,
      },
    },
  },
}));
