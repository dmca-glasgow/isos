import { Root } from 'mdast';
import { unified } from 'unified';
import remarkStringify from 'remark-stringify';

export function serialiseMdastToMarkdown(mdast: Root) {
  return unified().use(remarkStringify).stringify(mdast);
}
