import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function removeComments() {
  return (tree: Root) => {
    visit(tree, 'html', (node, idx, parent) => {
      node.value = node.value.replace(/<\!\-{2,3}([\s\S]+?)-{2,3}>/g, '');
      if (node.value.trim() === '') {
        parent?.children.splice(idx || 0, 1);
      }
    });
  };
}
