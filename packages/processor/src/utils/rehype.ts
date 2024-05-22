import { unified } from 'unified';
import { Root } from 'hast';
import rehypeStringify from 'rehype-stringify';

export function serialiseHastToHtml(hast: Root) {
  const html = unified()
    .use(rehypeStringify)
    .stringify(hast as Root);
  return { html };
}
