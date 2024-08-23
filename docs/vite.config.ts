import mdx from '@mdx-js/rollup';
import preact from '@preact/preset-vite';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), mdx({ remarkPlugins: [remarkGfm] })],
});
