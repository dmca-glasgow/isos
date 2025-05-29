import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function formatBreak() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'break') {
        Object.assign(node, {
          type: 'text',
          value: '\n',
        });
      }
    });
  };
}
