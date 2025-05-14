import { Root } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import strip from 'strip-markdown';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { serialiseAttributes } from './formatted-caption';

export function imageToPandocFigure() {
  return (tree: Root) => {
    // console.log('imageToPandocFigure');
    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node, _idx, parent) => {
      const children = parent?.children || [];
      if (children.length === 1) {
        const attrs: Record<string, string> = {
          alt: getText(node.alt),
          caption: node.title || '',
        };
        const attributes = serialiseAttributes(attrs);
        if (attributes) {
          children.push({
            type: 'inlineCode',
            value: attributes,
          });
          node.alt = null;
          node.title = null;
        }
      }
    });
    // console.dir(tree, { depth: null });
  };
}

function getText(markdown?: string | null) {
  if (!markdown) return '';

  const processor = unified()
    .use(remarkParse)
    .use(strip)
    .use(remarkStringify);

  return String(processor.processSync(markdown)).trim();
}
