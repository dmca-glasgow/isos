import { resolve } from 'pathe';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import {
  FileType,
  createMdxState,
  inputToMarkdown,
  markdownToArticle,
} from '..';
import {
  createContext,
  createTestContext,
} from '../latex-to-markdown/context';
import { Options } from '../markdown-to-mdx';
import { unindentStringAndTrim } from './unindent-string';

export const testProcessor = {
  latex: latexToMarkdown,
  md: markdownToHtml,
  fixture: fixtureToMarkdown,
};

const options = {
  noInlineImages: true,
};

async function latexToMarkdown(latex: string) {
  const prepared = unindentStringAndTrim(latex);
  const ctx = createTestContext(FileType.latex, prepared);
  return inputToMarkdown(ctx, options);
}

async function markdownToHtml(md: string) {
  const prepared = unindentStringAndTrim(md);
  const ctx = createTestContext(FileType.markdown, prepared);
  const markdown = await inputToMarkdown(ctx, options);
  const mdxState = createMdxState();
  mdxState.maths.mathsAsTex.value = true;
  mdxState.maths.syntaxHighlight.value = false;
  const component = await markdownToArticle(markdown, mdxState, {
    noWrapper: true,
    // noSections: true,
  });
  // @ts-expect-error
  const element = createElement(component.default);
  return formatHtml(renderToString(element));
}

async function fixtureToMarkdown(fixturePath: string) {
  const __dirname = import.meta.dirname;
  const filePath = resolve(__dirname, '../../fixtures', fixturePath);
  const ctx = await createContext(filePath);
  return inputToMarkdown(ctx, options);
}
