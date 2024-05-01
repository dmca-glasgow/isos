import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { createUnifiedPlugins } from '.';

export async function processMarkdown(markdown: string) {
  const { remarkPlugins, rehypePlugins } = createUnifiedPlugins();
  const mdast = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .parse(markdown);

  const hast = await unified()
    .use(remarkRehype)
    .use(rehypePlugins)
    .run(mdast);

  const html = unified().use(rehypeStringify).stringify(hast);

  return { mdast, hast, html };
}
