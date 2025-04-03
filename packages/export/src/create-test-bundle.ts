import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { createContext, inputToMarkdown } from '@isos/processor';
import { createDefaultOptions } from '@isos/processor';

import { createRuntimeHtml } from '.';

// const fonts = [
//   'modern', // good
//   'asana',
//   'bonum',
//   'dejavu',
//   'pagella', // good
//   'schola', // good
//   'termes', // good
//   'stix2', // good
//   'fira',
//   'euler',
//   'tex',
// ];

const ctx = await createContext(
  '/Users/staff/Work/latex-experiments/test1/MCA_lecturenotes.tex',
);
const options = createDefaultOptions(ctx);
const markdown = await inputToMarkdown(ctx.content, options);

const frontmatter = {
  docTitle: 'Test', // TODO
};

const folder = '../../runtime/dist/assets';

const bundle = {
  css: await readFile(
    fileURLToPath(new URL(`${folder}/index.css`, import.meta.url)),
    'utf-8',
  ),
  js: await readFile(
    fileURLToPath(new URL(`${folder}/index.css`, import.meta.url)),
    'utf-8',
  ),
  font: 'termes',
};

const runtime = await createRuntimeHtml(markdown, frontmatter, bundle);

const filePath = fileURLToPath(new URL('../test.html', import.meta.url));
await writeFile(filePath, runtime);
