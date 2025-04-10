import { Environment } from '@unified-latex/unified-latex-types';
import { htmlLike } from '@unified-latex/unified-latex-util-html-like';
import { match } from '@unified-latex/unified-latex-util-match';

export function descriptionToDl(node: Environment) {
  return htmlLike({
    tag: 'dl',
    content: node.content
      .filter((node) => match.macro(node, 'item'))
      .flatMap((node) => {
        const args = node.args || [];
        return [
          htmlLike({
            tag: 'dt',
            content: args[1].content,
            attributes: {},
          }),
          htmlLike({
            tag: 'dd',
            content: args[args.length - 1].content,
            attributes: {},
          }),
        ];
      }),
  });
}
