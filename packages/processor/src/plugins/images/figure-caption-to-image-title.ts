import { convertToMarkdown } from '@unified-latex/unified-latex-to-mdast';
import * as Ast from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { visit } from '@unified-latex/unified-latex-util-visit';

export function figureCaptionToImageTitle() {
  return (tree: Ast.Root) => {
    // console.log('figureCaptionToImageTitle');
    // console.dir(tree, { depth: null });
    visit(tree, (node) => {
      if (node.type === 'environment' && node.env === 'figure') {
        const caption = extractCaption(node);

        if (caption !== null) {
          const img = extractImage(node);

          if (img !== null) {
            const text = extractCaptionText(caption);

            const args = img.args || [];
            // console.dir(args, { depth: null });
            if (args[1]) {
              args[1].content.push({
                type: 'string',
                content: `caption="${text}"`,
              });
            }
          }
        }
      }
    });
  };
}

function extractCaption(figure: Ast.Node): Ast.Macro | null {
  let caption = null;
  visit(figure, (node, info) => {
    if (node.type === 'macro' && node.content === 'caption') {
      caption = node;

      // remove caption
      const parent = info.parents[0];
      if (parent && parent.type === 'environment') {
        parent.content.splice(info.index || 0, 1);
      }
    }
  });
  return caption;
}

function extractImage(figure: Ast.Node): Ast.Macro | null {
  let image = null;
  visit(figure, (node) => {
    if (node.type === 'macro' && node.content === 'includegraphics') {
      image = node;
    }
  });
  return image;
}

function extractCaptionText(caption: Ast.Macro) {
  const args = getArgsContent(caption);
  return convertToMarkdown(args[args.length - 1] || []).trim();
}
