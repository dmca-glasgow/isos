import { merge } from 'lodash';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import {
  RefObjectsYaml,
  createDefaultObjectsYaml,
} from '../../plugins/refs-and-counts/default-objects';
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
        const { custom = [], ...theorems } = fm.theorems;
        const customObj = custom.reduce(
          (acc: RefObjectsYaml, { name, ...theorem }) => {
            acc[name] = { ...theorem, type: 'theorem' };
            return acc;
          },
          {},
        );
        ctx.frontmatter.theorems = merge(
          ctx.frontmatter.theorems,
          theorems || {},
          customObj,
        );
      }
      if (fm['reference-location']) {
        ctx.frontmatter.referenceLocation = fm['reference-location'];
      }
    }
  };
}
