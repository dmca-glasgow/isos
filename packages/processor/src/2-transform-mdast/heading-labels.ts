import { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

export function headingLabels() {
  return (tree: Root) => {
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
      const id = text.value;

      // append to heading text
      const lastChild = node.children[node.children.length - 1] as Text;
      lastChild.value += ` {#${id}}`;

      // remove label node
      nextSiblingChildren.splice(0, 1);
    });
  };
}
