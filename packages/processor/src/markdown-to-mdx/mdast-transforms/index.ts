import remarkGfm from 'remark-gfm';
import { PluggableList } from 'unified';

import { inlineCodeHighlight } from '../../plugins/code/inline-code-highlight';
import { dashesToEndashEmdash } from '../../plugins/endash-emdash';
import { Context } from '../context';
import { Options } from '../options';
import { boxouts } from './boxouts';
// import { createTableOfContents } from '../sidebar';
import { center } from './center';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { extractFrontmatter } from './extract-frontmatter';
import { fancyTitle } from './fancy-title';
import { headings } from './headings';
import { references } from './references';
import { sectionize } from './sectionize';
import { sidenotes } from './sidenotes';
import { underline } from './underline';

export function createMdastTransforms(
  ctx: Context,
  options: Pick<Options, 'noSections'>,
): PluggableList {
  const plugins: PluggableList = [
    [remarkGfm, { singleTilde: false }],
    [extractFrontmatter, ctx],
    [headings, ctx],
    fancyTitle,
    [references, ctx],
    [boxouts, ctx],
    [sidenotes, ctx],
    center,
    underline,
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
    dashesToEndashEmdash,
    inlineCodeHighlight,
  ];

  if (options.noSections === false) {
    plugins.push(sectionize);
  }

  // should be last
  plugins.push(escapeCharsForMdx);

  return plugins;
}
