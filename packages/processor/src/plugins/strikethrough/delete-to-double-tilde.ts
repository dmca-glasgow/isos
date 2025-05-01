import { Parent, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export function deleteToDoubleTilde() {
  return (tree: Root) => {
    visit(tree, 'delete', (node: Parent) => {
      Object.assign(node, {
        type: 'text',
        value: `~~${toString(node.children)}~~`,
      });
    });
  };
}
