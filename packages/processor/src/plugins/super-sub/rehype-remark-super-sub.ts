import { Element, Text } from 'hast';
import { Handle, State } from 'hast-util-to-mdast';

export const superSubHandlers: Record<string, Handle> = {
  sup(_state: State, node: Element) {
    const text = node.children[0] as Text;
    return {
      type: 'text',
      value: `^${text.value}^`,
    };
  },
  sub(_state: State, node: Element) {
    const text = node.children[0] as Text;
    return {
      type: 'text',
      value: `~${text.value}~`,
    };
  },
};
