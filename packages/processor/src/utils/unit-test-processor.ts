import { FileType, inputToMarkdown, markdownToJs, runOptions } from '..';
import { run } from '@mdx-js/mdx';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import { unindentStringAndTrim } from './unindent-string';

export async function unitTestProcessor(md: string) {
  const prepared = unindentStringAndTrim(md);
  const markdown = await inputToMarkdown(FileType.markdown, prepared);
  const { article } = await markdownToJs(markdown);
  const component = await run(article, runOptions);
  // @ts-expect-error
  const element = createElement(component.default);
  const html = formatHtml(renderToString(element));
  return { markdown, html };
}
