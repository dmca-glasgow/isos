import { createProcessor, run } from '@mdx-js/mdx';
import { Root } from 'mdast';

import { createContext } from './context';
import { createRehypePlugins, processorOptions } from './hast-transforms';
import { markdownToMdast } from './mdast-transforms';
import { createRunOptions, createSidebarRunOptions } from './mdx-handlers';
import { MdxState } from './mdx-handlers/mdx-state';
import { Options, defaultOptions } from './options';
import { createTableOfContents } from './sidebar';

export { defaultOptions } from './options';
export type { Options } from './options';

export async function markdownToArticle(
  markdown: string,
  mdxState: MdxState,
  _options: Partial<Options> = {},
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    ..._options,
  };
  const mdast = await markdownToMdast(markdown, ctx, options);

  const processor = createProcessor({
    ...processorOptions,
    rehypePlugins: createRehypePlugins(ctx, options),
  });

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(mdast);
  const jsString = processor.stringify(estree);

  return run(jsString, createRunOptions(mdxState));
}

export async function markdownToTOC(
  markdown: string,
  mdxState: MdxState,
  _options: Partial<Options> = {},
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    noSections: true,
    ..._options,
  };
  const mdast = await markdownToMdast(markdown, ctx, options);
  const jsString = await createTableOfContents(mdast as Root);
  return run(jsString, createSidebarRunOptions(mdxState));
}
