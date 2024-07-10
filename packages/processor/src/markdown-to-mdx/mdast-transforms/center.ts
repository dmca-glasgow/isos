import { Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

export function center() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      const name = node.name.trim();
      if (name === 'center') {
        node.data = {
          ...(node.data || {}),
          hProperties: {
            ...(node.data?.hProperties || {}),
            className: ['center'],
          },
        };
      }
    });
  };
}
