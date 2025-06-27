import { Root } from 'mdast';
import refractor from 'refractor';
import { visit } from 'unist-util-visit';

export function codeHighlight() {
  return (tree: Root) => {
    visit(tree, 'inlineCode', (node) => {
      const match = node.value.match(/^{(.+)}\s+'(.*)'\s*$/);
      if (match !== null) {
        node.data = {
          hProperties: {
            className: `language-${match[1]}`,
          },
          hChildren: refractor.highlight(match[2], match[1]),
        };
      }
    });

    visit(tree, 'code', (node) => {
      if (node.lang) {
        node.data = {
          hProperties: {
            className: `language-${node.lang}`,
          },
          hChildren: refractor.highlight(node.value, node.lang),
        };
      }
    });
  };
}
