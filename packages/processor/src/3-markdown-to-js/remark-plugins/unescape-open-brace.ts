import { Root } from 'mdast';
import { Element } from 'hast';
import { visit } from 'unist-util-visit';

export function unescapeOpenBrace() {
  return (tree: Root) => {
    visit(tree, 'math', (node) => {
      const children = node.data?.hChildren || [];
      const element = children[0] as Element;
      const text = element.children[0];

      if (text && text.type === 'text') {
        text.value = unescapeMathString(text.value);
      }
    });

    visit(tree, 'inlineMath', (node) => {
      const children = node.data?.hChildren || [];
      const text = children[0];

      if (text && text.type === 'text') {
        text.value = unescapeMathString(text.value);
      }
    });
  };
}

function unescapeMathString(str: string) {
  return str.replace(/\\\{/g, '{');
}
