import { Root, Text } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

import { boxoutAllowList } from '../../shared-utils/boxout-allow-list';

export function boxouts() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      const name = node.name.trim();
      if (boxoutAllowList.includes(name)) {
        const className = ['boxout', node.name.trim()];

        node.data = {
          ...(node.data || {}),
          hProperties: {
            ...(node.data?.hProperties || {}),
            className,
          },
        };

        createProofBox(node);
      }

      if (name === 'framed') {
        node.data = {
          ...(node.data || {}),
          hProperties: {
            ...(node.data?.hProperties || {}),
            className: 'framed',
          },
        };
      }
    });
  };
}

function createProofBox(node: ContainerDirective) {
  if (node.name === 'proof' || node.name === 'solution') {
    const proofBox: Text = {
      type: 'text',
      value: ' ◻',
      data: {
        hName: 'span',
        hProperties: {
          className: ['proof-box'],
        },
        hChildren: [
          {
            type: 'text',
            value: '◻',
          },
        ],
      },
    };

    const lastP = node.children.findLast((o) => o.type === 'paragraph');

    if (lastP) {
      // @ts-expect-error
      lastP.children.push(proofBox);
    } else {
      // @ts-expect-error
      node.children.push(proofBox);
    }
  }
}
