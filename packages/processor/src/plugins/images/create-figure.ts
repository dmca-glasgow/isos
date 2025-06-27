import { convertToMarkdown } from '@unified-latex/unified-latex-to-mdast';
import * as Ast from '@unified-latex/unified-latex-types';
import { Macro } from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { htmlLike } from '@unified-latex/unified-latex-util-html-like';
// import { expandUnicodeLigatures } from '@unified-latex/unified-latex-util-ligatures';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { kebabCase } from 'lodash';

// import { Context } from '../../input-to-markdown/context';

export function createFigure(node: Macro): Macro {
  const args = getArgsContent(node);

  const attributes: Record<string, string> = {
    src: printRaw(args[args.length - 1] || []),
  };

  const attrs = args.slice(0, -1).filter(Boolean).flat() as Ast.Node[];
  // console.dir(attrs, { depth: null });

  if (
    attrs[0] &&
    attrs[0].type === 'string' &&
    attrs[0].content === 'alt' &&
    attrs[2].type === 'group'
  ) {
    attributes.alt = convertToMarkdown(attrs[2].content).trim();
  }
  const id = attrs.find(
    (o) => o.type === 'string' && o.content.startsWith('id="'),
  ) as Ast.String;

  if (id !== undefined) {
    const idMatch = id.content.match(/id="(.*?)"/);
    if (idMatch !== null) {
      attributes.id = kebabCase(idMatch[1]).trim();
    }
  }

  const caption = attrs.find(
    (o) => o.type === 'string' && o.content.startsWith('caption="'),
  ) as Ast.String;

  if (caption !== undefined) {
    const captionMatch = caption.content.match(/caption="(.*?)"/);
    if (captionMatch !== null) {
      attributes.title = captionMatch[1].replace(/"/g, '\"').trim();
    }
  }

  // console.log('createFigure');
  // console.log(attributes);

  return htmlLike({
    tag: 'img',
    attributes,
    content: [],
  });
}
