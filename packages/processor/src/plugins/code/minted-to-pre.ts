import { Environment } from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { toString } from '@unified-latex/unified-latex-util-to-string';

import { htmlLike } from '@isos/unified-latex-util-html-like';
import { printRaw } from '@isos/unified-latex-util-print-raw';

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
