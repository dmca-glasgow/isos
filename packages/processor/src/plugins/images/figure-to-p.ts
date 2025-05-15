import { Root } from 'hast';
import { visit } from 'unist-util-visit';

export function figureToP() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'div') {
        const { className } = node.properties;
        if (Array.isArray(className) && className.includes('figure')) {
          Object.assign(node, { tagName: 'p' });
        }
      }
    });
  };
}
