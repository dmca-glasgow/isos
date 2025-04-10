import { Element, Text } from 'hast';
import { State } from 'hast-util-to-mdast';

export function rehypeRemarkDel(_state: State, node: Element): Text {
  const text = node.children[0] as Text;
  return {
    type: 'text',
    value: `~~${text.value}~~`,
  };
}
