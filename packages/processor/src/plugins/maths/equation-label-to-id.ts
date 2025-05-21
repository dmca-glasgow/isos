import * as Ast from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { visit } from '@unified-latex/unified-latex-util-visit';
import { kebabCase } from 'lodash';

import { printRaw } from '../../../../unified-latex-util-print-raw/libs/print-raw';

export function equationLabelToId() {
  return (tree: Ast.Root) => {
    visit(tree, (node) => {
      if (node.type === 'mathenv') {
        const env = (node.env || {}) as Ast.Node;
        if (env.type === 'string' && env.content === 'equation') {
          const label = extractLabel(node);
          if (label) {
            Object.assign(node, {
              data: {
                id: extractLabelText(label),
              },
            });
          }
        }
      }
    });
  };
}

function extractLabel(mathEnv: Ast.Node): Ast.Macro | null {
  let label = null;
  visit(mathEnv, (node, info) => {
    if (node.type === 'macro' && node.content === 'label') {
      label = node;

      // remove label
      const parent = info.parents[0];
      if (parent && parent.type === 'mathenv') {
        parent.content.splice(info.index || 0, 1);
      }
    }
  });
  return label;
}

function extractLabelText(label: Ast.Macro) {
  const args = getArgsContent(label);
  const text = printRaw(args[args.length - 1] || []).trim();
  return kebabCase(text);
}
