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
        const label = args[1];
        const content = args[args.length - 1];
        const result = [];

        if (label.content.length) {
          result.push(
            htmlLike({
              tag: 'dt',
              content: label?.content || [],
              attributes: {},
            }),
          );
        }

        result.push(
          htmlLike({
            tag: 'dd',
            content: content?.content || [],
            attributes: {},
          }),
        );

        return result;
      }),
  });
}
