import { State } from 'hast-util-to-mdast';
import { Element } from 'hast';
import { TextDirective } from 'mdast-util-directive';
import { PhrasingContent } from 'mdast';

export function createSideNote(
  state: State,
  node: Element
): TextDirective {
  return {
    type: 'textDirective',
    name: 'sidenote',
    children: state.all(node) as PhrasingContent[],
  };
}
