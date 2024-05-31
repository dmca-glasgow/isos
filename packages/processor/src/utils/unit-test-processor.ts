import { FileType, inputToMarkdown, markdownToJs, runOptions } from '..';
import { run } from '@mdx-js/mdx';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import { unindentStringAndTrim } from './unindent-string';

export async function unitTestProcessor(markdown: string) {
  const prepared = unindentStringAndTrim(markdown);
  const md = await inputToMarkdown(FileType.markdown, prepared);
  const { article } = await markdownToJs(md);
  const component = await run(article, runOptions);
  // @ts-expect-error
  const element = createElement(component.default);
  const html = renderToString(element);
  return formatHtml(html);
}
