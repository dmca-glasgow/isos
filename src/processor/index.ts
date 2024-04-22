import { latexToMarkdown } from './latex-to-md';
import { markdownToHtml } from './md-to-html';

export async function process(filePath: string) {
  const md = await latexToMarkdown(filePath)
  const html = await markdownToHtml(md)
  return html
}
