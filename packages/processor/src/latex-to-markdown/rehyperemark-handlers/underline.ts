import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Text } from 'mdast';

export function createUnderline(state: State, node: Element): Text {
  const text = node.children[0] as Text;
  return {
    type: 'text',
    value: `<u>${text.value}</u>`,
  };
}
