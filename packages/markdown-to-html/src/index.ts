import { createContext } from './context';
import { processMarkdown } from './process-markdown';
import { createRehypePlugins } from './rehype-plugins';
import { createRemarkPlugins } from './remark-plugins';

export function createUnifiedPlugins() {
  const ctx = createContext();
  return {
    remarkPlugins: createRemarkPlugins(ctx),
    rehypePlugins: createRehypePlugins(ctx),
  };
}

export async function markdownToHtml(fileContents: string) {
  const { html } = await processMarkdown(fileContents);
  // console.log(html);
  return html;
}
