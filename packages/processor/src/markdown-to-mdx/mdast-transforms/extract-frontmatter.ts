import { merge } from 'lodash';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import { createDefaultObjectsYaml } from '../../plugins/refs-and-counts/default-objects';
import { Context, Frontmatter } from '../context';

export function extractFrontmatter(ctx: Context) {
  return (tree: Root) => {
    const fmStrings: string[] = [];

    visit(tree, 'yaml', (node, idx, parent) => {
      fmStrings.push(node.value);
      parent?.children.splice(idx || 0, 1);
    });

    ctx.frontmatter.theorems = createDefaultObjectsYaml();

    if (fmStrings.length) {
      const combined = fmStrings.join('\n\n');
      const fm = parse(combined) as Frontmatter;

      if (fm.title) {
        ctx.frontmatter.title = fm.title;
      }
      if (fm.date) {
        ctx.frontmatter.date = fm.date;
      }
      if (fm.author) {
        const author = Array.isArray(fm.author) ? fm.author : [fm.author];
        ctx.frontmatter.author = author;
      }
      if (fm.abstract) {
        ctx.frontmatter.abstract = fm.abstract;
      }
      if (fm.theorems) {
        ctx.frontmatter.theorems = merge(
          ctx.frontmatter.theorems,
          fm.theorems || {},
        );
      }
      if (fm['reference-location']) {
        ctx.frontmatter.referenceLocation = fm['reference-location'];
      }
    }
  };
}
