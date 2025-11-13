import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'pathe';

import { createRuntimeHtml } from '@isos/export';

import { unindentStringAndTrim } from './unindent-string';

export { unindentStringAndTrim } from './unindent-string';

export async function createE2eTestBundle(markdown: string) {
  const md = unindentStringAndTrim(markdown);
  const frontmatter = {
    docTitle: 'Test',
  };

  const __dirname = import.meta.dirname;
  const folder = resolve(__dirname, '../../runtime/dist/assets');

  const bundle = {
    css: await readFile(
      fileURLToPath(new URL(`${folder}/index.css`, import.meta.url)),
      'utf-8',
    ),
    js: await readFile(
      fileURLToPath(new URL(`${folder}/runtime.js`, import.meta.url)),
      'utf-8',
    ),
  };
  return createRuntimeHtml(md, frontmatter, bundle);
}
