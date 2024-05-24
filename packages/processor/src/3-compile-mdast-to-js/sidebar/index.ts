import { processorOptions } from '../utils/processor-options';
import { defaultRunOptions } from '../utils/run-options';
import { useMDXComponents } from './components';
import { RunOptions, createProcessor } from '@mdx-js/mdx';

import { prepareMarkdown } from '../utils/prepare-markdown';

export async function compileMarkdownToSidebarJs(markdown: string) {
  const processor = createProcessor({
    ...processorOptions,
    remarkPlugins: [],
    rehypePlugins: [],
  });

  const prepared = prepareMarkdown(markdown);
  return String(await processor.process(prepared));
}

export const sidebarRunOptions: RunOptions = {
  ...defaultRunOptions,
  useMDXComponents,
};
