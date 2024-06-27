import { Root } from '@unified-latex/unified-latex-types';
import { toString } from '@unified-latex/unified-latex-util-to-string';
import { visit } from '@unified-latex/unified-latex-util-visit';

import { Context } from '../context';

export type FancyTitle = {
  content: string;
  part: string;
};

export function extractFancyTitle(ctx: Context) {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'macro') {
        if (node.content === 'title') {
          const args = node.args || [];
          const text = args[1] || {};
          ctx.fancyTitle.content = toString(text.content);
        }
        if (node.content === 'exsheetnumber') {
          const args = node.args || [];
          const text = args[0] || {};
          ctx.fancyTitle.part = toString(text.content);
        }
      }
    });
  };
}
