import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { toString } from 'hast-util-to-string';
import { LeafDirective } from 'mdast-util-directive';

export function createSetCounter(
  _state: State,
  node: Element,
): LeafDirective {
  const depthName = toString(node.children[0]);
  const value = toString(node.children[1]);
  return {
    type: 'leafDirective',
    name: 'set-counter',
    children: [],
    attributes: {
      name: depthName,
      value,
    },
  };
}
