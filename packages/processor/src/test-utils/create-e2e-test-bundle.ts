import { readFile } from 'fs/promises';
import { fileURLToPath } from 'node:url';

import { createRuntimeHtml } from '@isos/export';

import { unindentString } from './unindent-string';

export async function createE2eTestBundle(markdown: string) {
  const md = unindentString(markdown);
  const frontmatter = {
    docTitle: 'Test', // TODO
  };
  const folder = '../../../runtime/dist/assets';

  const bundle = {
    css: await readFile(
      fileURLToPath(new URL(`${folder}/index.css`, import.meta.url)),
      'utf-8',
    ),
    js: await readFile(
      fileURLToPath(new URL(`${folder}/runtime.js`, import.meta.url)),
      'utf-8',
    ),
    font: 'termes',
  };
  return createRuntimeHtml(md, frontmatter, bundle);
}
