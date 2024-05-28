import { LeafDirective } from 'mdast-util-directive';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export function pagebreaks() {
  return (tree: Node) => {
    visit(tree, 'leafDirective', (node: LeafDirective) => {
      if (node.name === 'pagebreak') {
        node.data = {
          hName: 'hr',
          hProperties: {
            className: 'pagebreak',
          },
        };
      }
    });
  };
}
