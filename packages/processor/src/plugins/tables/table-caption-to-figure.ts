import { Element, ElementContent } from 'hast';
import { Parent, PhrasingContent, Root, Table } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

import { createRemarkProcessor } from '../../remark-processor';

export function tableCaptionToFigure() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'table', (node, idx, parent) => {
      const nextIdx = (idx || 0) + 1;
      const paragraph = parent?.children[nextIdx];
      if (paragraph && paragraph.type === 'paragraph') {
        const firstChild = paragraph.children[0];
        if (
          firstChild &&
          firstChild.type === 'textDirective' &&
          firstChild.name === 'table-caption'
        ) {
          const caption = firstChild.children;
          const attributes = firstChild.attributes || {};
          createTableFigure(node as Table, caption, attributes);
          paragraph.children.splice(0, 1);
        }
      }
    });
  };
}

function createTableFigure(
  table: Table,
  caption: PhrasingContent[],
  attributes: Record<string, string | null | undefined>,
) {
  const captionHast = getCaptionHast(caption);
  const figCaption: ElementContent[] = [];

  if (captionHast.length) {
    figCaption.push({
      type: 'element',
      tagName: 'figcaption',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Table',
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['tbl-count', 'table'],
                ['data-id']: attributes.id,
              },
              children: [],
            },
            {
              type: 'text',
              value: ':',
            },
          ],
        },
        {
          type: 'text',
          value: ' ',
        },
        ...captionHast,
      ],
    });
  }
  table.data = {
    hName: 'figure',
    hProperties: attributes,
    hChildren: [...figCaption, toHast(table) as Element],
  };
}

const processor = createRemarkProcessor([remarkRehype]);

function getCaptionHast(mdAst: PhrasingContent[]) {
  const transformed = processor.runSync({
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: mdAst,
      },
    ],
  } as Root) as Parent;
  if (transformed.children.length === 0) {
    return [];
  }
  const firstChild = transformed.children[0] as Parent;
  return firstChild.children as ElementContent[];
}
