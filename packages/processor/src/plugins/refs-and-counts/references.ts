import { Link, Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';

export function references(ctx: Context) {
  return (tree: Root) => {
    visit(tree, 'textDirective', (node) => {
      if (node.name === 'ref') {
        const text = node.children[0] as Text;
        const id = text.value;
        const reference = ctx.frontmatter.refMap[id];
        // console.log(id, count);

        const link: Link = {
          type: 'link',
          url: `#${reference.id}`,
          data: {
            ...(node.data || {}),
            hProperties: {
              ...(node.data?.hProperties || {}),
              className: ['ref'],
            },
          },
          children: [
            {
              type: 'text',
              value: String(reference.label),
            },
          ],
        };

        Object.assign(node, link);
      }
    });
  };
}
