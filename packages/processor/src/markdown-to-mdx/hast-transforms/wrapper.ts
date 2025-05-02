import { ElementContent, Properties, Root } from 'hast';

import { Context } from '../context';

export function createWrapper(ctx: Context) {
  return (tree: Root) => {
    const properties: Properties = {};

    if (ctx.hasSideNotes) {
      properties.className = 'has-sidenotes';
    }

    tree.children = [
      {
        type: 'element',
        tagName: 'article',
        properties,
        children: tree.children as ElementContent[],
      },
    ];
  };
}
