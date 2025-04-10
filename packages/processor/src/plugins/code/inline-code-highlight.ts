import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function inlineCodeHighlight() {
  return (tree: Root) => {
    visit(tree, 'inlineCode', (node) => {
      const match = node.value.match(/^{(.+)}\s+'(.*)'\s*$/);
      if (match !== null) {
        node.data = {
          hProperties: {
            className: `language-${match[1]}`,
          },
          hChildren: [
            {
              type: 'text',
              value: match[2],
            },
          ],
        };
      }
    });
  };
}
