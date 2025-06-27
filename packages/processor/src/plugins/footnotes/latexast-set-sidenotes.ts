import { Root } from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

import { Context } from '../../input-to-markdown/context';

export function setSideNotes(ctx: Context) {
  return (tree: Root) => {
    // console.log(ctx);
    // console.dir(tree, { depth: null });
    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'setsidenotes') {
        const args = node.args || [];
        const arg = args[args.length - 1] || {};
        // console.log(arg.content);
        ctx.frontmatter['reference-location'] =
          arg.content[0].type === 'string' &&
          arg.content[0].content === 'footnote' &&
          arg.content[1].type === 'string' &&
          arg.content[1].content === '=' &&
          arg.content[2].type === 'string' &&
          arg.content[2].content === 'false'
            ? 'document'
            : 'margin';
      }
    });
  };
}
