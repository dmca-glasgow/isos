import { readFile } from 'fs/promises';
import path from 'path';

import { createRuntimeHtml } from '@isos/export';

import { unindentString } from './unindent-string';

export async function createE2eTestBundle(markdown: string) {
  const md = unindentString(markdown);
  const frontmatter = {
    docTitle: 'Test', // TODO
  };
  const resources = 'src-tauri/resources';
  const bundle = {
    css: await readFile(path.resolve(`${resources}/runtime.css`), 'utf-8'),
    js: await readFile(path.resolve(`${resources}/runtime.js`), 'utf-8'),
    font: 'termes',
  };
  return createRuntimeHtml(md, frontmatter, bundle);
}
