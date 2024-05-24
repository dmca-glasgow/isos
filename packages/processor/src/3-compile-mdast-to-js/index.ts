import { useMDXComponents } from './components';
import { createRehypePlugins } from './rehype-plugins';
import { createRemarkPlugins } from './remark-plugins';
import { processorOptions } from './utils/processor-options';
import { defaultRunOptions } from './utils/run-options';
import { RunOptions, createProcessor } from '@mdx-js/mdx';

import { createContext } from './context';
import { prepareMarkdown } from './utils/prepare-markdown';

export { compileMarkdownToSidebarJs, sidebarRunOptions } from './sidebar';

export async function compileMarkdownToJs(markdown: string) {
  const ctx = createContext();

  const processor = createProcessor({
    ...processorOptions,
    remarkPlugins: createRemarkPlugins(ctx),
    rehypePlugins: createRehypePlugins(ctx),
  });

  const prepared = prepareMarkdown(markdown);

  return String(await processor.process(prepared));
}

export const runOptions: RunOptions = {
  ...defaultRunOptions,
  useMDXComponents,
};
