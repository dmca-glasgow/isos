import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function setHeadingCounterToDiv() {
  return (tree: Root) => {
    visit(tree, 'leafDirective', (node) => {
      // console.log(node);
      node.data = {
        hProperties: {
          className: ['set-counter'],
          'data-name': node.attributes?.name,
          'data-value': node.attributes?.value,
        },
      };
    });
  };
}
