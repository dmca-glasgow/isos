import { createRehypePlugins } from './rehype-plugins';
import { createRemarkPlugins } from './remark-plugins';
import { createProcessor } from '@mdx-js/mdx';

import { createContext } from './context';

export { runOptions } from './run-options';

export async function compileMarkdownToJs(markdown: string) {
  const ctx = createContext();

  const processor = createProcessor({
    outputFormat: 'function-body',
    elementAttributeNameCase: 'html',
    providerImportSource: '@mdx-js/preact',
    remarkPlugins: createRemarkPlugins(ctx),
    rehypePlugins: createRehypePlugins(ctx),
  });

  const prepared = prepareMarkdown(markdown);

  return String(await processor.process(prepared));
}

// https://mdxjs.com/docs/troubleshooting-mdx/#problems-writing-mdx
function prepareMarkdown(markdown: string) {
  return markdown.replace(/\{/g, '\\{').replace(/</g, '\\<');
}
