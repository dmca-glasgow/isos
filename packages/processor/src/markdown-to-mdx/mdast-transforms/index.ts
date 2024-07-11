import { boxouts } from './boxouts';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { headingAttributes } from './heading-attributes';
import { headingIncrements } from './heading-increments';
import { references } from './references';
import { sidenotes } from './sidenotes';
import { Root } from 'mdast';

import { createRemarkProcessor } from '../../shared-utils/remark-pipeline';
import { Context } from '../context';
import { center } from './center';
import { extractFrontmatter } from './extract-frontmatter';
import { fancyTitle } from './fancy-title';
import { underline } from './underline';

export async function markdownToMdast(
  markdown: string,
  ctx: Context
  // options: Options
) {
  const processor = createRemarkProcessor([
    [extractFrontmatter, ctx],
    fancyTitle,
    [headingIncrements, ctx],
    headingAttributes,
    [references, ctx],
    [boxouts, ctx],
    center,
    [sidenotes, ctx],
    underline,

    // should be last
    escapeCharsForMdx,

    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
  ]);
  const mdast = processor.parse(markdown);
  return processor.run(mdast as Root);
}
