import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { PhrasingContent } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';

import { callouts } from './callouts';

export function createCallout(
  state: State,
  node: Element,
): ContainerDirective {
  let type = '';

  const { className } = node.properties;
  if (Array.isArray(className)) {
    for (const klass of className) {
      const match = String(klass).match(/^macro-(.+)box$/);
      if (match !== null && callouts.includes(match[1])) {
        type = `callout-${match[1]}`;
      }
    }
  }

  return {
    type: 'containerDirective',
    name: ' ',
    attributes: {
      class: type,
    },
    children: [
      {
        type: 'paragraph',
        children: state.all(node) as PhrasingContent[],
      },
    ],
  };
}
