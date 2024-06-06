import { Element, Parent, Text } from 'hast';
import { State } from 'hast-util-to-mdast';
import { BlockContent, PhrasingContent } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

export function createEnvironment(
  state: State,
  div: Element,
  environmentName: string
): ContainerDirective {
  const type = 'containerDirective';
  const name = environmentName;

  // extract label manually associated with environment
  // and set it as container directive id attribute
  const attributes: Record<string, string> = {};

  visit(div, 'element', (node, idx, parent) => {
    if (node.tagName === 'span') {
      const className = node.properties.className;
      if (Array.isArray(className) && className.includes('macro-label')) {
        attributes.id = findRefLabel(node);

        // remove label node
        const parentChildren = parent?.children || [];
        parentChildren.splice(idx || 0, 1);
      }
    }
  });

  const children: BlockContent[] = [
    {
      type: 'paragraph',
      children: state.all(div) as PhrasingContent[],
    },
  ];

  return { type, name, attributes, children };
}

function findRefLabel(node: Element) {
  const parents = (node.children || []) as Parent[];
  const parent = parents.find((child) => {
    const children = child.children || [];
    return children.length > 0;
  });

  if (parent === undefined) {
    return '';
  }

  const literal = (parent.children[0] || {}) as Text;
  return literal.value || '';
}
