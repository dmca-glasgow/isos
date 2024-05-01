import { latexToMarkdown } from '@isos/latex-to-markdown';
import { markdownToHtml } from '@isos/markdown-to-html';
import { readFile, writeFile } from 'fs/promises';

const filePath =
  '/Users/staff/Work/latex-experiments/test1/MCA_lecturenotes.tex';

const fileContents = await readFile(filePath, 'utf-8');
const markdown = await latexToMarkdown(fileContents);
const html = await markdownToHtml(markdown);

await writeFile('./test1.html', html);
