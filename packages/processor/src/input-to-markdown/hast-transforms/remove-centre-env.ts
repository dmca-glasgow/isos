import { Root } from 'hast';
import { visit } from 'unist-util-visit';

export function removeCenterEnv() {
  return (tree: Root) => {
    visit(
      tree,
      'element',
      (node, idx = 0, parent) => {
        if (node.tagName === 'center') {
          if (parent && idx > 0) {
            parent.children.splice(idx, 1, ...node.children);
          }
        }
      },
      true,
    );
  };
}
