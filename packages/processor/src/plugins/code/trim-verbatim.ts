import { Root } from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

export function trimVerbatim() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'verbatim') {
        node.content = node.content.trim();
      }
    });
  };
}
