import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Heading, PhrasingContent } from 'mdast';

export function createHeadings(state: State, node: Element): Heading {
  const type = 'heading';
  const classNames = getClassNames(node);
  const depth = getAdjustedDepth(node, classNames);
  const children = state.all(node) as PhrasingContent[];

  if (classNames.includes('starred')) {
    children.push({
      type: 'text',
      value: ' {.unnumbered}',
    });
  }

  return { type, depth, children };
}

function getAdjustedDepth(node: Element, classNames: string[]) {
  const depth = Number(node.tagName[1]);
  const adjustedDepth = classNames.includes('section-subparagraph')
    ? depth
    : depth - 1;
  return adjustedDepth as Heading['depth'];
}

function getClassNames(node: Element) {
  const className = node.properties?.className || [];
  return Array.isArray(className)
    ? className.map(String)
    : String(className).split(' ');
}
