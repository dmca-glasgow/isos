import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Heading, PhrasingContent } from 'mdast';

export function createTitle(state: State, node: Element): Heading {
  const children = node.children as Element[];

  const mandatoryArg = children.find(
    (o) => o.properties?.dataOpenMark === '{'
  ) as Element;

  // const optionalArg = children.find(
  //   (o) => o.properties?.dataOpenMark === '['
  // );

  // const newChildren: (TextDirective | Heading)[] = [];

  // if (optionalArg) {
  //   newChildren.push({
  //     type: 'textDirective',
  //     name: 'pre-title',
  //     children: state.all(optionalArg) as PhrasingContent[],
  //   });
  // }

  const heading: Heading = {
    type: 'heading',
    depth: 1,
    children: state.all(mandatoryArg) as PhrasingContent[],
  };

  // newChildren.push(heading);

  // const containerDirective = {
  //   type: 'containerDirective',
  //   name: 'title',
  //   children: newChildren as BlockContent[],
  // }

  return heading;
}
