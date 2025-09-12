import * as Ast from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

export function framedSidenotes() {
  return (tree: Ast.Root) => {
    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'framedsidenote') {
        // console.log(node);
        if (Array.isArray(node.args)) {
          // ignore optional arguments
          node.args = node.args.filter((o) => o.openMark === '{');
        }
      }
    });
  };
}
