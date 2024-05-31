import { useMDXComponents } from './components';
import { createRehypePlugins } from './rehype-plugins';
import { createRemarkPlugins } from './remark-plugins';
import {
  ProcessorOptions,
  RunOptions,
  createProcessor,
} from '@mdx-js/mdx';
import { Nodes, Root } from 'mdast';
import { toc } from 'mdast-util-toc';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { prepareMarkdown } from '../utils/prepare-markdown';
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

export async function markdownToJs(markdown: string) {
  const ctx = createContext();
  const processor = createProcessor({
    ...processorOptions,
    remarkPlugins: createRemarkPlugins(ctx),
    rehypePlugins: createRehypePlugins(ctx),
  });

  const prepared = prepareMarkdown(markdown);
  const mdast = processor.parse(prepared);

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(mdast);

  return {
    article: processor.stringify(estree),
    tableOfContents: await createTableOfContents(mdast),
  };
}

async function createTableOfContents(mdast: Root) {
  const tocMdast = toc(mdast as Nodes, { maxDepth: 3 }).map;

  if (tocMdast === undefined) {
    return '';
  }

  const processor = createProcessor(processorOptions);

  // @ts-expect-error: mdast is not of type Program
  const estree = await processor.run(tocMdast);

  return processor.stringify(estree);
}
