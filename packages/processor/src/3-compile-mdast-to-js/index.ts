import { createProcessor, ProcessorOptions } from '@mdx-js/mdx';

import { createContext } from './context';
import { createRehypePlugins } from './rehype-plugins';
import { createRemarkPlugins } from './remark-plugins';

const options: ProcessorOptions = {
  outputFormat: 'function-body',
  elementAttributeNameCase: 'html',
};

export async function compileMarkdownToJs(markdown: string) {
  const ctx = createContext();
  options.remarkPlugins = createRemarkPlugins(ctx);
  options.rehypePlugins = createRehypePlugins(ctx);

  const processor = createProcessor(options);
  const prepared = prepareMarkdown(markdown);

  return {
    jsString: String(await processor.process(prepared)),
  };
}

// https://mdxjs.com/docs/troubleshooting-mdx/#problems-writing-mdx
function prepareMarkdown(markdown: string) {
  return markdown.replace(/\{/g, '\\{').replace(/</g, '\\<');
}
