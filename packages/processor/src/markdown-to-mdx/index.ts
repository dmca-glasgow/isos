import { createRehypePlugins } from './hast-transforms';
import { markdownToMdast } from './mdast-transforms';
import { useMDXComponents } from './mdx-handlers';
import { Options, defaultOptions } from './options';
import {
  ProcessorOptions,
  RunOptions,
  createProcessor,
} from '@mdx-js/mdx';
import { Nodes, Root } from 'mdast';
import { toc } from 'mdast-util-toc';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { createContext } from './context';

export const runOptions: RunOptions = {
  Fragment,
  useMDXComponents,

  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};

const processorOptions: ProcessorOptions = {
  outputFormat: 'function-body',
  elementAttributeNameCase: 'html',
  providerImportSource: '@mdx-js/preact',
};

export async function markdownToJs(
  markdown: string,
  _options: Partial<Options> = {}
) {
  const ctx = createContext();
  const options = {
    ...defaultOptions,
    ..._options,
  };
  const mdast = await markdownToMdast(markdown, ctx);
  // console.dir(mdast, { depth: null });

  const processor = createProcessor({
    ...processorOptions,
    rehypePlugins: createRehypePlugins(ctx, options),
  });

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(mdast);

  return {
    article: processor.stringify(estree),
    tableOfContents: await createTableOfContents(mdast as Root),
  };
}

async function createTableOfContents(mdast: Root) {
  const tocMdast = toc(mdast as Nodes, { maxDepth: 3, minDepth: 2 }).map;

  if (tocMdast === undefined) {
    return '';
  }

  const processor = createProcessor(processorOptions);

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(tocMdast);

  return processor.stringify(estree);
}
