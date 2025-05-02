import { PluggableList } from 'unified';

import { inlineCodeHighlight } from '../../plugins/code/inline-code-highlight';
import { dashesToEndashEmdash } from '../../plugins/endash-emdash';
import { headingSections } from '../../plugins/headings/heading-sections';
import { headings } from '../../plugins/headings/mdx-headings';
import atReferences from '../../plugins/reference';
import { theorems } from '../../plugins/theorems-proofs/mdx-theorems';
import { Context } from '../context';
import { Options } from '../options';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { extractFrontmatter } from './extract-frontmatter';

// import { center } from './center';
// import { fancyTitle } from './fancy-title';
// import { references } from './references';
// import { sidenotes } from './sidenotes';
// import { underline } from './underline';

export function createMdastTransforms(
  ctx: Context,
  options: Pick<Options, 'noSections'>,
): PluggableList {
  const plugins: PluggableList = [
    // headingSections depends on this
    [headings, ctx],
  ];

  if (options.noSections === false) {
    // theorems depends on this
    plugins.push(headingSections);
  }

  plugins.push(
    [extractFrontmatter, ctx],
    atReferences,
    dashesToEndashEmdash,
    inlineCodeHighlight,
    [theorems, ctx],

    // fancyTitle,
    // [references, ctx],
    // [sidenotes, ctx],
    // center,
    // underline,
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
  );

  // should be last
  plugins.push(escapeCharsForMdx);

  return plugins;
}
