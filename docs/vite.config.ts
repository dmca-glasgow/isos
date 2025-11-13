import mdx from '@mdx-js/rollup';
import preact from '@preact/preset-vite';
import wyw from '@wyw-in-js/vite';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      prefreshEnabled: false,
    }),
    wyw(),
    mdx({ remarkPlugins: [remarkGfm] }),
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
    target: 'es2022',
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
  },
});
