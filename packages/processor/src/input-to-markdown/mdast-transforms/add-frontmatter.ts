import { Root } from 'mdast';
import { stringify } from 'yaml';

import { theoremsToFrontmatter } from '../../plugins/refs-and-counts/theorems-to-frontmatter';
import { Context } from '../context';

export function addFrontmatter(ctx: Context) {
  return (tree: Root) => {
    // console.log(ctx.frontmatter);
    const toExport: Record<string, any> = {};

    if (ctx.frontmatter.title) {
      toExport.title = ctx.frontmatter.title;
    }

    if (ctx.frontmatter.date) {
      toExport.date = ctx.frontmatter.date;
    }

    if (ctx.frontmatter.author.length > 0) {
      if (ctx.frontmatter.author.length > 1) {
        toExport.author = ctx.frontmatter.author;
      } else {
        toExport.author = ctx.frontmatter.author[0];
      }
    }

    if (ctx.frontmatter.abstract) {
      toExport.abstract = ctx.frontmatter.abstract;
    }

    if (ctx.frontmatter['reference-location'] !== 'margin') {
      toExport['reference-location'] =
        ctx.frontmatter['reference-location'];
    }

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
