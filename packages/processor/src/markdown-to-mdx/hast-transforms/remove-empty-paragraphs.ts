import { Root } from 'hast';
import { visit } from 'unist-util-visit';

export function removeEmptyParagraphs() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'element', (node, idx, parent) => {
      if (node.tagName === 'p' && node.children.length === 0) {
        parent?.children.splice(idx || 0, 1);
      }
    });
  };
}
