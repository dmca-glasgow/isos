import { Element, Parent, Text } from 'hast';
import { State } from 'hast-util-to-mdast';
import { kebabCase } from 'lodash';

export function createReference(_state: State, node: Element): Text {
  const id = findRefLabel(node);
  return {
    type: 'text',
    value: id ? `@${id}` : '',
  };
}

function findRefLabel(node: Element) {
  const parents = (node.children || []) as Parent[];
  const parent = parents.find((child) => {
    const children = child.children || [];
    return children.length > 0;
  });

  if (parent === undefined) {
    return '';
  }

  const literal = (parent.children[0] || {}) as Text;
  return kebabCase(literal.value || '');
}
