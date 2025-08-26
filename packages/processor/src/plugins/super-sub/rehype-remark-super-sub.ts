import { Element, Text } from 'hast';
import { Handle, State } from 'hast-util-to-mdast';
import { toString } from 'hast-util-to-string';

export const superSubHandlers: Record<string, Handle> = {
  sup(_state: State, node: Element) {
    return {
      type: 'text',
      value: `^${toString(node)}^`,
    };
  },
  sub(_state: State, node: Element) {
    return {
      type: 'text',
      value: `~${toString(node)}~`,
    };
  },
};
