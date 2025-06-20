import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function warn() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'textDirective', (node) => {
      if (node.name === 'warn') {
        node.data = {
          hName: 'span',
          hProperties: {
            className: ['warn'],
          },
        };
      }
    });
  };
}
