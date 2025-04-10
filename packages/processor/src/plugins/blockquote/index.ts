import { Element } from 'hast';
import { State, toMdast } from 'hast-util-to-mdast';
import { BlockContent, Blockquote, Root } from 'mdast';

export function displayQuoteToBlockQuote(state: State, node: Element) {
  const blockquote = toMdast(node) as Root;
  const result: Blockquote = {
    type: 'blockquote',
    children: (blockquote.children || []) as BlockContent[],
  };
  state.patch(node, result);
  return result;
}
