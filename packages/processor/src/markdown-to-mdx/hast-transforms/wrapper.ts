import { ElementContent, Root } from 'hast';

import { Context } from '../context';

export function createWrapper(ctx: Context) {
  return (tree: Root) => {
    const className = ['wrapper'];

    if (ctx.hasSidenotes) {
      className.push('has-sidenotes');
    }

    tree.children = [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className,
        },
        children: tree.children as ElementContent[],
      },
    ];
  };
}
