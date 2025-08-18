import * as Ast from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

export function fancySectionToSection() {
  return (tree: Ast.Root) => {
    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'fancysection') {
        node.content = 'section';
      }
    });
  };
}

export function fancyBoxedToSubSection() {
  return (tree: Ast.Root) => {
    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'fancyboxed') {
        node.content = 'subsection';
      }
    });
  };
}
