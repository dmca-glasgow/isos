import {
  hasAttributes,
  parseAttributes,
} from '../../shared-utils/parse-heading-attributes';
import { Heading, Text } from 'mdast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export function headingAttributes() {
  return (tree: Node) => {
    visit(tree, 'heading', (node: Heading) => {
      transformHeadings(node);
    });
  };
}

function transformHeadings(node: Heading) {
  const lastChild = node.children[node.children.length - 1] as Text;
  const lastChildValue = lastChild?.value || '';
  const { text, attributes } = parseAttributes(lastChildValue);
  lastChild.value = text;

  if (hasAttributes(lastChildValue)) {
    const classes = attributes.classes.filter((s) => s !== 'starred');
    if (classes.length) {
      node.data = {
        ...(node.data || {}),
        hProperties: {
          ...(node.data?.hProperties || {}),
          className: classes.join(' '),
        },
      };
    }
  }
}
