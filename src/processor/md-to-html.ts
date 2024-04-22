import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { unified } from 'unified';

export async function markdownToHtml(md: string) {
  const file = await unified()
    .use(remarkParse, { fragment: true })
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
