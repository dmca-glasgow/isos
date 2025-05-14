import { resolve } from 'pathe';
import { createElement } from 'preact';
import renderToString from 'preact-render-to-string';
import formatHtml from 'pretty';

import { createMdxState, inputToMarkdown, markdownToArticle } from '..';
import {
  createContext,
  createTestContext,
} from '../latex-to-markdown/context';
import {
  Options,
  createDefaultOptions,
} from '../latex-to-markdown/options';
import { createContext as createHtmlContext } from '../markdown-to-mdx/context';
import { createDefaultOptions as createHtmlOptions } from '../markdown-to-mdx/options';
// import { Options } from '../markdown-to-mdx';
import { unindentStringAndTrim } from './unindent-string';

export const testProcessor = {
  latex: latexToMarkdown,
  md: markdownToHtml,
  mdToMd: markdownToMarkdown,
  fixture: fixtureToMarkdown,
};

const testOptions = {
  noInlineImages: true,
};

const testHtmlOptions = {
  noWrapper: true,
  // noSections: true,
};

async function latexToMarkdown(latex: string) {
  const prepared = unindentStringAndTrim(latex);
  const ctx = createTestContext('latex', prepared);
  const options = createDefaultOptions(ctx, testOptions);
  return inputToMarkdown(ctx.content, options);
}

async function markdownToHtml(md: string) {
  const prepared = unindentStringAndTrim(md);
  const ctx = createTestContext('markdown', prepared);
  const options = createDefaultOptions(ctx, testOptions);
  const markdown = await inputToMarkdown(ctx.content, options);
  const mdxState = createMdxState();
  mdxState.maths.mathsAsTex.value = true;
  mdxState.maths.syntaxHighlight.value = false;

  const htmlCtx = createHtmlContext();
  const htmlOptions = createHtmlOptions(
    mdxState,
    htmlCtx,
    testHtmlOptions,
  );
  const component = await markdownToArticle(markdown, htmlOptions);
  // @ts-expect-error
  const element = createElement(component.default);
  return formatHtml(renderToString(element));
}

async function markdownToMarkdown(md: string) {
  const prepared = unindentStringAndTrim(md);
  const ctx = createTestContext('markdown', prepared);
  const options = createDefaultOptions(ctx, testOptions);
  return inputToMarkdown(ctx.content, options);
}

async function fixtureToMarkdown(
  fixturePath: string,
  options?: Partial<Options>,
) {
  const filePath = getAbsoluteFixturePath(fixturePath);
  const ctx = await createContext(filePath);
  const opts = createDefaultOptions(ctx, { ...testOptions, ...options });
  return inputToMarkdown(ctx.content, opts);
}

function getAbsoluteFixturePath(fixturePath: string) {
  const __dirname = import.meta.dirname;
  return resolve(__dirname, '../../fixtures', fixturePath);
}
