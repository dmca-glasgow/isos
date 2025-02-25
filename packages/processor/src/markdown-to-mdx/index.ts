import { createRehypePlugins, processorOptions } from './hast-transforms';
import { markdownToMdast } from './mdast-transforms';
import { createMDXComponents } from './mdx-handlers';
import { Options, defaultOptions } from './options';
import { RunOptions, createProcessor } from '@mdx-js/mdx';
import { Root } from 'mdast';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { createContext } from './context';
import { createTableOfContents } from './sidebar';

export {
  TocHighlightProvider,
  TocHighlightContext,
} from './mdx-handlers/toc-highlight/toc-highlight-provider';

export type { FontName } from './mdx-handlers/math';

export { MathsProvider, MathsContext } from './mdx-handlers/math';

export { sidebarRunOptions } from './sidebar';

export function createRunOptions(
  options: Partial<Options> = {},
): RunOptions {
  return {
    Fragment,
    useMDXComponents: createMDXComponents(options),

    // @ts-expect-error: jsx is incompatible for unknown reasons
    jsx,
    // @ts-expect-error: jsxs is incompatible for unknown reasons
    jsxs,
    // @ts-expect-error: jsxDEV is incompatible for unknown reasons
    jsxDEV,
  };
}

export async function markdownToArticle(
  markdown: string,
  _options: Partial<Options> = {},
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    ..._options,
  };
  // const { mdast, tableOfContents } = await markdownToMdast(markdown, ctx, options);
  const mdast = await markdownToMdast(markdown, ctx, options);
  // console.dir(mdast, { depth: null });

  const processor = createProcessor({
    ...processorOptions,
    rehypePlugins: createRehypePlugins(ctx, options),
  });

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(mdast);
  return processor.stringify(estree);
}

export async function markdownToTOC(
  markdown: string,
  _options: Partial<Options> = {},
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    noSections: true,
    ..._options,
  };
  // const { mdast, tableOfContents } = await markdownToMdast(markdown, ctx, options);
  const mdast = await markdownToMdast(markdown, ctx, options);
  // console.dir(mdast, { depth: null });
  return createTableOfContents(mdast as Root);
}
