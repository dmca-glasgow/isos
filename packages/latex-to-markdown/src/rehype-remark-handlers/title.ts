import { State } from 'hast-util-to-mdast';
import { Element } from 'hast';
import { ContainerDirective, TextDirective } from 'mdast-util-directive';
import { Heading, PhrasingContent, BlockContent } from 'mdast';

export function createTitle(
  state: State,
  node: Element
): ContainerDirective {
  const children = node.children as Element[];
  const newChildren: (TextDirective | Heading)[] = [];

  const mandatoryArg = children.find(
    (o) => o.properties?.dataOpenMark === '{'
  );

  const optionalArg = children.find(
    (o) => o.properties?.dataOpenMark === '['
  );

  if (optionalArg) {
    newChildren.push({
      type: 'textDirective',
      name: 'pre-title',
      children: state.all(optionalArg) as PhrasingContent[],
    });
  }

  if (mandatoryArg) {
    newChildren.push({
      type: 'heading',
      depth: 1,
      children: state.all(mandatoryArg) as PhrasingContent[],
    });
  }

  return {
    type: 'containerDirective',
    name: 'title',
    children: newChildren as BlockContent[],
  };
}
