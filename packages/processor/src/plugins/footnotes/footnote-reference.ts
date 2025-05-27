import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function footnoteReference() {
  return (tree: Root) => {
    visit(tree, 'footnoteReference', (node) => {
      node.data = {
        hName: 'sup',
        hProperties: {
          className: ['fn-ref'],
        },
        hChildren: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: `#fn-${node.identifier || ''}`,
              id: `#fn-ref-${node.identifier || ''}`,
            },
            children: [
              {
                type: 'text',
                value: String(node.label || ''),
              },
            ],
          },
        ],
      };
    });
  };
}
