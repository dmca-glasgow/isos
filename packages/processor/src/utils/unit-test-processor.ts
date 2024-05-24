import { FileType, inputToMarkdown, markdownToJs } from '..';
import { run } from '@mdx-js/mdx';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import { unindentStringAndTrim } from './unindent-string';

export async function unitTestProcessor(markdown: string) {
  const prepared = unindentStringAndTrim(markdown);
  const md = await inputToMarkdown(FileType.markdown, prepared);
  const { jsString, runOptions } = await markdownToJs(md);
  const component = await run(jsString, runOptions);
  // @ts-expect-error
  const element = createElement(component.default);
  const html = renderToString(element);
  return formatHtml(html);
}
