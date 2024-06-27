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
  const lastTextIdx = node.children.findLastIndex(
    (o) => o.type === 'text'
  );
  const lastTextChild = node.children[lastTextIdx] as Text;
  const lastChildValue = lastTextChild?.value || '';

  if (hasAttributes(lastChildValue)) {
    const { text, attributes } = parseAttributes(lastChildValue);

    lastTextChild.value = text;

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
