import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Paragraph, PhrasingContent } from 'mdast';
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

  const children = state
    .all(div)
    .reduce((acc: (Paragraph | ContainerDirective)[], child) => {
      if (child.type === 'containerDirective') {
        acc.push(child);
      } else {
        const last = acc[acc.length - 1];

        if (last?.type !== 'paragraph') {
          acc.push({
            type: 'paragraph',
            children: [child as PhrasingContent],
          });
        } else {
          last.children.push(child as PhrasingContent);
        }
      }

      return acc;
    }, []);

  // console.log(children);

  return {
    type: 'containerDirective',
    name: ' ', // Pandoc divs
    attributes,
    children,
  };
}
