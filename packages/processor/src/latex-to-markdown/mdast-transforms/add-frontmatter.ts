import { Root } from 'mdast';
import { stringify } from 'yaml';

import { Context } from '../context';

export function addFrontmatter(ctx: Context) {
  return (tree: Root) => {
    const toExport: Record<string, any> = {};

    const { theorems } = ctx.frontmatter;
    if (Object.keys(theorems).length > 0) {
      toExport.theorems = theorems;
    }

    if (Object.keys(theorems).length > 0) {
      tree.children.unshift({
        type: 'yaml',
        value: stringify(toExport).trim(),
      });
    }
  };
}
