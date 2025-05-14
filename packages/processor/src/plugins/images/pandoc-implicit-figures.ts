import { ElementContent } from 'hast';
import { Parent, Root } from 'mdast';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

import { createRemarkProcessor } from '../../remark-processor';

const processor = createRemarkProcessor([remarkRehype]);

export function pandocImplicitFigures() {
  return (tree: Root) => {
    // console.log('pandocImplicitFigures');
    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node, _idx, parent) => {
      if (parent?.type !== 'paragraph') {
        return;
      }

      const caption = node.data?.hProperties?.['data-caption'] || '';

      if (!caption) {
        return;
      }

      const captionHast = getCaptionHast(String(caption));

      parent.data = {
        hName: 'figure',
        hProperties: {
          src: null,
          alt: null,
        },
        hChildren: [
          {
            type: 'element',
            tagName: 'img',
            properties: {
              src: node.url,
              alt: node.alt || '',
              title: node.title || null,
            },
            children: [],
          },
          {
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
                    value: 'Figure 1:', // TODO figure counter
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              ...captionHast,
            ],
          },
        ],
      };
    });
  };
}

function getCaptionHast(caption: string) {
  const parsed = processor.parse(String(caption));
  const transformed = processor.runSync(parsed) as Parent;
  if (transformed.children.length === 0) {
    return [];
  }
  const firstChild = transformed.children[0] as Parent;
  return firstChild.children as ElementContent[];
}
