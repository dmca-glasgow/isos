import { Element, Text } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Code } from 'mdast';

export function rehypeRemarkPre(_state: State, node: Element) {
  const text = node.children[0] as Text;
  const { lang } = node.properties;
  const code: Code = {
    type: 'code',
    value: text?.value.trim() || '',
  };
  if (typeof lang === 'string') {
    code.lang = lang;
  }
  return code;
}
