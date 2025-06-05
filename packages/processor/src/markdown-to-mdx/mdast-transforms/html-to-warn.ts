import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function htmlToWarn() {
  return (tree: Root) => {
    visit(tree, 'html', (node) => {
      Object.assign(node, {
        type: 'containerDirective',
        name: 'raw-html',
        value: null,
        children: [],
        data: {
          hName: 'pre',
          hProperties: {
            className: 'raw-html',
          },
          hChildren: [
            {
              type: 'element',
              tagName: 'code',
              properties: {
                className: ['language-html'],
              },
              children: [
                {
                  type: 'text',
                  value: node.value,
                },
              ],
            },
          ],
        },
      });
    });
  };
}
