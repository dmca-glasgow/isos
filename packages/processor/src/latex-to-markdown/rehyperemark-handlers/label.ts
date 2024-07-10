import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { PhrasingContent } from 'mdast';
import { TextDirective } from 'mdast-util-directive';

export function createLabel(state: State, node: Element): TextDirective {
  return {
    type: 'textDirective',
    name: 'label',
    children: state.all(node) as PhrasingContent[],
  };
}
