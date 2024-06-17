import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Heading, PhrasingContent } from 'mdast';

export function createFancySection(state: State, node: Element): Heading {
  const children = state.all(node) as PhrasingContent[];
  return {
    type: 'heading',
    depth: 2,
    children: [
      ...children,
      {
        type: 'text',
        value: ' {.fancy.starred}',
      },
    ],
  };
}
