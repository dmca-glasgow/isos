import { Environment } from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { htmlLike } from '@unified-latex/unified-latex-util-html-like';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { toString } from '@unified-latex/unified-latex-util-to-string';

export function mintedToPre(node: Environment) {
  const args = getArgsContent(node);
  const language = printRaw(args[args.length - 1] || []);
  return htmlLike({
    tag: 'pre',
    attributes: { lang: language },
    content: [
      {
        type: 'string',
        content: toString(node.content),
      },
    ],
  });
}
