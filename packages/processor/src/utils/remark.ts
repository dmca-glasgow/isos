import { Root } from 'mdast';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

const processor = unified()
  .use(remarkDirective)
  .use(remarkParse)
  .use(remarkStringify);

export function parseMarkdownToMdast(markdown: string) {
  const mdast = processor.parse(markdown) as Root;
  return { mdast };
}

export function serialiseMdastToMarkdown(mdast: Root) {
  const markdown = processor.stringify(mdast);
  return { markdown };
}
