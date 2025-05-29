import { Element, Root as HastRoot } from 'hast';
import { startCase } from 'lodash';
import { Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import { callouts } from './callouts';

export function createCallouts() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name === ' ') {
        // console.log(node);
        const className = node.attributes?.class || '';
        const match = className.match(/^callout-(.+)/);
        if (match !== null && callouts.includes(match[1])) {
          createCallout(match[1], node);
        }
      }
    });
  };
}

function createCallout(type: string, node: ContainerDirective) {
  const hast = toHast({
    type: 'root',
    children: node.children,
  }) as HastRoot;
  node.data = {
    hName: 'div',
    hProperties: {
      className: ['callout', type],
    },
    hChildren: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['callout-header'],
        },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`callout-icon-${type}`],
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['callout-title'],
            },
            children: [
              {
                type: 'text',
                value: node.attributes?.title || startCase(type),
              },
            ],
          },
        ],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['callout-content'],
        },
        children: hast.children as Element[],
      },
    ],
  };
}
