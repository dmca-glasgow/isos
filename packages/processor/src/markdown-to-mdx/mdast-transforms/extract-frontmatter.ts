import { merge } from 'lodash';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import {
  RefObjectsYaml,
  createDefaultObjectsYaml,
} from '../../plugins/refs-and-counts/default-objects';
import { Context } from '../context';

type Frontmatter = {
  theorems: RefObjectsYaml;
  'reference-location': string;
};

export function extractFrontmatter(ctx: Context) {
  return (tree: Root) => {
    let frontmatter: Frontmatter | undefined;

    visit(tree, 'yaml', (node) => {
      frontmatter = parse(node.value);
    });

    ctx.theorems = createDefaultObjectsYaml();

    // console.log(frontmatter);
    if (frontmatter) {
      ctx.theorems = merge(ctx.theorems, frontmatter.theorems || {});

      ctx.referenceLocation =
        frontmatter['reference-location'] || 'margin';
    }
  };
}
