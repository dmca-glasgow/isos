import { Element } from 'hast';
import { InlineMath, Math } from 'mdast-util-math';
import { Text } from 'mdast';

export function createInlineMaths(node: Element): InlineMath {
  const math = node.children[0] as Text;
  return {
    type: 'inlineMath',
    value: math.value,
  };
}

export function createMaths(node: Element): Math {
  const math = node.children[0] as Text;
  return {
    type: 'math',
    value: math.value,
  };
}
