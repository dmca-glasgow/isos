import { Element, Text } from 'hast';
import { State } from 'hast-util-to-mdast';
import kebabCase from 'lodash.kebabcase';
import { PhrasingContent } from 'mdast';
import { TextDirective } from 'mdast-util-directive';

export function createLabel(state: State, node: Element): TextDirective {
  const children = state.all(node) as PhrasingContent[];
  const text = children[0] as Text;
  text.value = kebabCase(text.value);
  return {
    type: 'textDirective',
    name: 'label',
    children,
  };
}
