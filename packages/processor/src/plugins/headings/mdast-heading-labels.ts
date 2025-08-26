import { kebabCase } from 'lodash';
import { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

import {
  hasAttributes,
  parseAttributes,
  serialiseAttributes,
} from '../../parse-attributes';

export function headingLabels() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'heading', (node, idx, parent) => {
      const parentChildren = parent?.children || [];
      const nextIdx = (idx || 0) + 1;
      const nextSibling = parentChildren[nextIdx];
      if (!nextSibling || nextSibling.type !== 'paragraph') {
        return;
      }

      const nextSiblingChildren = nextSibling.children || [];
      const firstChild = nextSiblingChildren[0];
      if (
        !firstChild ||
        firstChild.type !== 'textDirective' ||
        firstChild.name !== 'label'
      ) {
        return;
      }

      // extract id
      const text = firstChild.children[0] as Text;
      const id = kebabCase(text.value);

      // append to heading text
      const lastChild = node.children[node.children.length - 1];
      if (lastChild.type === 'text') {
        if (hasAttributes(lastChild.value)) {
          const { text, attributes } = parseAttributes(lastChild.value);
          attributes.id = id;
          lastChild.value = `${text} ${serialiseAttributes(attributes)}`;
        } else {
          lastChild.value += ` ${serialiseAttributes({ id })}`;
        }
      } else {
        node.children.push({
          type: 'text',
          value: ` ${serialiseAttributes({ id })}`,
        });
      }

      // remove label node
      parentChildren.splice(nextIdx, 1);
    });
  };
}
