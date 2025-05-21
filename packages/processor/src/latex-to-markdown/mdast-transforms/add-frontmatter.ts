import { Root } from 'mdast';
import { stringify } from 'yaml';

import { theoremsToFrontmatter } from '../../plugins/refs-and-counts/theorems-to-frontmatter';
import { Context } from '../context';

export function addFrontmatter(ctx: Context) {
  return (tree: Root) => {
    const toExport: Record<string, any> = {};

    const { theorems } = ctx.frontmatter;
    const theoremsYaml = theoremsToFrontmatter(theorems);

    if (Object.keys(theoremsYaml).length > 0) {
      toExport.theorems = theoremsYaml;
    }

    if (Object.keys(toExport).length > 0) {
      tree.children.unshift({
        type: 'yaml',
        value: stringify(toExport).trim(),
      });
    }
  };
}
