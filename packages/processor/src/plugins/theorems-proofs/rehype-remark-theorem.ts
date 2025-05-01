import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { PhrasingContent } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';

export function createTheorem(
  state: State,
  div: Element,
  type: string,
): ContainerDirective {
  const attributes: Record<string, string> = {
    class: type,
  };

  if (typeof div.properties.name === 'string') {
    attributes.name = div.properties.name;
  }

  const children = state.all(div) as PhrasingContent[];

  return {
    type: 'containerDirective',
    name: ' ', // Pandoc divs
    attributes,
    children: [
      {
        type: 'paragraph',
        children,
      },
    ],
  };
}
