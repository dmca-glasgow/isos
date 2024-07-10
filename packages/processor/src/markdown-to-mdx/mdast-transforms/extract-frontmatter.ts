import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import { Theorems } from '../../shared-utils/theorem';
import { Context } from '../context';

type Frontmatter = {
  theorems: Theorems;
};

export function extractFrontmatter(ctx: Context) {
  return (tree: Root) => {
    visit(tree, 'yaml', (node) => {
      const frontmatter = parse(node.value) as Frontmatter;
      ctx.theorems = frontmatter.theorems;
    });
  };
}
