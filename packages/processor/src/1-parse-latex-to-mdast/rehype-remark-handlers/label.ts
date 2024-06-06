import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';

export function createLabel(state: State, node: Element) {
  return {
    type: 'textDirective',
    name: 'label',
    children: state.all(node),
  };
}
