import * as Ast from '@unified-latex/unified-latex-types';
import * as Hast from 'hast';
import { h } from 'hastscript';

// import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import {
  extractFromHtmlLike,
  isHtmlLikeTag,
} from '@isos/unified-latex-util-html-like';
import { printRaw } from '@isos/unified-latex-util-print-raw';

function formatNodeForError(node: Ast.Node | any): string {
  try {
    return printRaw(node);
  } catch {}
  return JSON.stringify(node);
}

type HastNode = Hast.Element | Hast.Text | Hast.Comment;

/**
 * Create a `toHast` function that will log by making a call to `logger`.
 */
export function toHastWithLoggerFactory(
  logger: (message: string, node: any) => void,
) {
  /**
   * Convert Ast.Node to Hast nodes.
   */
  return function toHast(
    node: Ast.Node | Ast.Argument,
  ): HastNode | HastNode[] {
    // Because `isHtmlLikeTag` is a type guard, if we use it directly on
    // `node` here, then in the switch statement `node.type === "macro"` will be `never`.
    // We rename the variable to avoid this issue.
    const htmlNode = node;
    if (isHtmlLikeTag(htmlNode)) {
      const extracted = extractFromHtmlLike(htmlNode);
      const attributes: Record<string, any> = extracted.attributes;
      return h(
        extracted.tag,
        attributes,
        extracted.content.flatMap(toHast),
      );
    }

    switch (node.type) {
      case 'string':
        return {
          type: 'text',
          value: node.content,
          position: node.position,
        };
      case 'comment':
        return {
          type: 'comment',
          value: node.content,
          position: node.position,
        };
      case 'inlinemath':
        // console.log(JSON.stringify(node, null, 2));
        return h(
          'span',
          { className: 'inline-math' },
          printRaw(node.content),
        );
      case 'mathenv':
        // @ts-expect-error
        const id = node.data?.id;
        const attributes: Record<string, string> = {
          className: 'display-math',
        };
        if (id) {
          attributes.id = id;
        }
        return h('div', attributes, printRaw(node));
      case 'displaymath':
        // console.dir(node, { depth: null });
        return h(
          'div',
          { className: 'display-math' },
          printRaw(node.content),
        );
      case 'verb':
        return h('code', { className: node.env }, node.content);
      case 'verbatim':
        return h('pre', { className: node.env }, node.content);
      case 'whitespace':
        return { type: 'text', value: ' ', position: node.position };
      case 'parbreak':
        return [h('br'), h('br')];
      case 'group':
        // Groups are just ignored.
        return node.content.flatMap(toHast);
      case 'environment':
        logger(
          `Unknown environment when converting to HTML \`${formatNodeForError(
            node.env,
          )}\``,
          node,
        );
        return h(
          'div',
          { className: ['environment', printRaw(node.env)] },
          node.content.flatMap(toHast),
        );
      case 'macro':
        logger(
          `Unknown macro when converting to HTML \`${formatNodeForError(
            node,
          )}\``,
          node,
        );
        // if (node.content === 'begin') {
        //   console.log(node);
        // }
        return h(
          'span',
          { className: ['macro', `macro-${node.content}`] },
          // TODO: check if this has been fixed by change to line 121
          node.content === 'sidenote'
            ? (node.args || [])[0].content.map(toHast).flat()
            : (node.args || []).map(toHast).flat(),
        );
      case 'argument':
        return h(
          'span',
          {
            className: ['argument'],
            'data-open-mark': node.openMark,
            'data-close-mark': node.closeMark,
          },
          node.content.flatMap(toHast),
        );
      case 'root':
        return node.content.flatMap(toHast);
      default: {
        // const _exhaustiveCheck: never = node;
        throw new Error(
          `Unknown node type; cannot convert to HAST ${JSON.stringify(
            node,
          )}`,
        );
      }
    }
  };
}

/**
 * Convert Ast.Node to Hast nodes.
 */
export const toHast = toHastWithLoggerFactory(console.warn);
