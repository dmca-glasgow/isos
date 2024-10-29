import {
  FileType,
  createRunOptions,
  inputToMarkdown,
  markdownToJs,
} from '..';
import { run } from '@mdx-js/mdx';
import { resolve } from 'pathe';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import {
  createContext,
  createTestContext,
} from '../latex-to-markdown/context';
import { unindentStringAndTrim } from './unindent-string';

export const testProcessor = {
  latex: latexToMarkdown,
  md: markdownToHtml,
  fixture: fixtureToMarkdown,
};

async function latexToMarkdown(latex: string) {
  const prepared = unindentStringAndTrim(latex);
  const ctx = createTestContext(FileType.latex, prepared);
  return inputToMarkdown(ctx);
}

async function markdownToHtml(md: string) {
  const prepared = unindentStringAndTrim(md);
  const ctx = createTestContext(FileType.markdown, prepared);
  const markdown = await inputToMarkdown(ctx);
  const options = {
    mathsAsTex: true,
    noWrapper: true,
  };
  const { article } = await markdownToJs(markdown, options);
  const component = await run(article, createRunOptions(options));
  // @ts-expect-error
  const element = createElement(component.default);
  return formatHtml(renderToString(element));
}

async function fixtureToMarkdown(fixturePath: string) {
  const __dirname = import.meta.dirname;
  const filePath = resolve(__dirname, '../../fixtures', fixturePath);
  const ctx = await createContext(filePath);
  return inputToMarkdown(ctx, {
    noInlineImages: true,
  });
}
