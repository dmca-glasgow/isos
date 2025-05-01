import { merge } from 'lodash';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import {
  TheoremsYaml,
  createDefaultTheoremsYaml,
} from '../../plugins/theorems-proofs/default-theorems';
import { Context } from '../context';

type Frontmatter = {
  theorems: TheoremsYaml;
};

export function extractFrontmatter(ctx: Context) {
  return (tree: Root) => {
    let frontmatter: Frontmatter | undefined;

    visit(tree, 'yaml', (node) => {
      frontmatter = parse(node.value);
    });

    ctx.theorems = merge(
      createDefaultTheoremsYaml(),
      frontmatter?.theorems || {},
    );
  };
}
