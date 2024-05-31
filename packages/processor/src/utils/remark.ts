import { Root } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export function parseMarkdownToMdast(markdown: string) {
  const mdast = unified().use(remarkParse).parse(markdown) as Root;
  return { mdast };
}

export function serialiseMdastToMarkdown(mdast: Root) {
  const markdown = unified().use(remarkStringify).stringify(mdast);
  return { markdown };
}
