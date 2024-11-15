// @ts-expect-error
import { chunker } from './pagedjs';

import { config } from './config';

import './pagedjs/index.scss';
import './pagedjs/interface.scss';

let loading = true;

export async function render(app: HTMLElement, renderTo: HTMLElement) {
  loading = true;

  console.log('chunking...');
  const chunks = await chunker(app, renderTo, config);
  console.log(`took: ${(chunks.performance / 1000).toFixed(2)}s`);

  loading = false;
  document.dispatchEvent(new Event('pages-loaded'));

  return chunks;
}

export function waitForRender() {
  return new Promise((resolve) => {
    if (loading) {
      document.addEventListener('pages-loaded', resolve, { once: true });
    } else {
      resolve(true);
    }
  });
}
