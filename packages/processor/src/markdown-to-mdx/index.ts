import { createRehypePlugins, processorOptions } from './hast-transforms';
import { markdownToMdast } from './mdast-transforms';
// import { createMDXComponents } from './mdx-handlers';
import { Options, defaultOptions } from './options';
import { createProcessor } from '@mdx-js/mdx';
import { Root } from 'mdast';

import { createContext } from './context';
import { createTableOfContents } from './sidebar';

export type { Options } from './options';

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
