import { Element, Parent, Text } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Link } from 'mdast';

export function createAnchorLink(state: State, node: Element): Link {
  const id = findRefLabel(node);
  return {
    type: 'link',
    url: `#${id}`,
    children: [
      {
        type: 'text',
        value: id,
      },
    ],
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
  return literal.value || '';
}
