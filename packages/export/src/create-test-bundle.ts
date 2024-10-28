import { createRuntimeHtml } from '.';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { createContext, inputToMarkdown } from '@isos/processor';

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

const markdown = await inputToMarkdown(ctx);

const frontmatter = {
  docTitle: 'Test',
};

const bundle = {
  css: await readFile(
    fileURLToPath(
      new URL('../../runtime/dist/assets/index.css', import.meta.url),
    ),
    'utf-8',
  ),
  js: await readFile(
    fileURLToPath(
      new URL('../../runtime/dist/assets/runtime.js', import.meta.url),
    ),
    'utf-8',
  ),
  font: 'termes',
};

const filePath = fileURLToPath(new URL('../test.html', import.meta.url));
const runtime = await createRuntimeHtml(markdown, frontmatter, bundle);

await writeFile(filePath, runtime);
