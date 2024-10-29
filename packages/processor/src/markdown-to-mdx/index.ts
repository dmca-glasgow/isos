import { createRehypePlugins, processorOptions } from './hast-transforms';
import { markdownToMdast } from './mdast-transforms';
import { createMDXComponents } from './mdx-handlers';
import { Options, defaultOptions } from './options';
import { RunOptions, createProcessor } from '@mdx-js/mdx';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { createContext } from './context';

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

export async function markdownToJs(
  markdown: string,
  _options: Partial<Options> = {},
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    ..._options,
  };
  const { mdast, tableOfContents } = await markdownToMdast(markdown, ctx);
  // console.dir(mdast, { depth: null });

  const processor = createProcessor({
    ...processorOptions,
    rehypePlugins: createRehypePlugins(ctx, options),
  });

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(mdast);
  const article = processor.stringify(estree);

  return {
    article,
    tableOfContents,
  };
}
