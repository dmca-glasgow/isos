import { FileType, inputToMarkdown, markdownToJs, runOptions } from '..';
import { run } from '@mdx-js/mdx';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import { unindentStringAndTrim } from './unindent-string';

export const testProcessor = {
  latex: latexToMarkdown,
  md: markdownToHtml,
  async both(latex: string, md: string) {
    const markdown = await latexToMarkdown(latex);

    const prepared = unindentStringAndTrim(md);
    if (markdown !== prepared) {
      console.log('latexToMarkdown:', `"${markdown}"`);
      console.log('markdown:', `"${prepared}"`);
      throw new Error('markdown does not match');
    }

    return markdownToHtml(markdown);
  },
};

async function latexToMarkdown(latex: string) {
  const prepared = unindentStringAndTrim(latex);
  return inputToMarkdown(FileType.latex, prepared);
}

async function markdownToHtml(md: string) {
  const prepared = unindentStringAndTrim(md);
  const markdown = await inputToMarkdown(FileType.markdown, prepared);
  const { article } = await markdownToJs(markdown, {
    mathsAsTex: true,
    noWrapper: true,
  });
  const component = await run(article, runOptions);
  // @ts-expect-error
  const element = createElement(component.default);
  return formatHtml(renderToString(element));
}
