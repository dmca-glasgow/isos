import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Text } from 'mdast';
import { TextDirective } from 'mdast-util-directive';

export function createUnderline(
  _state: State,
  node: Element
): TextDirective {
  const text = node.children[0] as Text;
  return {
    type: 'textDirective',
    name: 'underline',
    children: [
      {
        type: 'text',
        value: text.value,
      },
    ],
  };
}
