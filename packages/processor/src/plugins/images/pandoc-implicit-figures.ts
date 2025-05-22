import { ElementContent } from 'hast';
import { Parent, Root } from 'mdast';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

import { createRemarkProcessor } from '../../remark-processor';

export function pandocImplicitFigures() {
  return (tree: Root) => {
    // console.log('pandocImplicitFigures');
    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node, _idx, parent) => {
      if (parent?.type !== 'paragraph') {
        return;
      }

      const props = node.data?.hProperties || {};
      const id = props['id'] || null;
      const caption = props['data-caption'] || '';

      if (!caption) {
        return;
      }

      const captionHast = getCaptionHast(String(caption));

      parent.data = {
        hName: 'figure',
        hProperties: {
          src: null,
          alt: null,
          id,
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
                    value: 'Figure',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['fig-count', 'figure'],
                      'data-id': id,
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
          },
        ],
      };
    });
  };
}

const processor = createRemarkProcessor([remarkRehype]);

function getCaptionHast(caption: string) {
  const parsed = processor.parse(String(caption));
  const transformed = processor.runSync(parsed) as Parent;
  if (transformed.children.length === 0) {
    return [];
  }
  const firstChild = transformed.children[0] as Parent;
  return firstChild.children as ElementContent[];
}
