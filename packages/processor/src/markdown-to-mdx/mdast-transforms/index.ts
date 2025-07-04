import { PluggableList } from 'unified';

import { createCallouts } from '../../plugins/callout/create-callouts';
import { codeHighlight } from '../../plugins/code/code-highlight';
import { cover } from '../../plugins/cover/cover';
import { divSyntax } from '../../plugins/div-syntax/mdx-divs';
import { dashesToEndashEmdash } from '../../plugins/endash-emdash';
import { footnoteReference } from '../../plugins/footnotes/footnote-reference';
import { headings } from '../../plugins/headings/mdx-headings';
import { imageAttributes } from '../../plugins/images/image-attributes';
import { pandocImplicitFigures } from '../../plugins/images/pandoc-implicit-figures';
import { mathMetaToId } from '../../plugins/maths/math-meta-to-id';
import { headingSections } from '../../plugins/sections/heading-sections';
import { tableCaptionToFigure } from '../../plugins/tables/table-caption-to-figure';
import { theorems } from '../../plugins/theorems-proofs/mdx-theorems';
import { warn } from '../../plugins/warn/warn';
import { Context } from '../context';
import { Options } from '../options';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { extractFrontmatter } from './extract-frontmatter';
import { htmlToWarn } from './html-to-warn';
import { removeComments } from './remove-comments';

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
    dashesToEndashEmdash,
    codeHighlight,
    imageAttributes,
    pandocImplicitFigures,
    mathMetaToId,
    tableCaptionToFigure,
    warn,
    removeComments,
    createCallouts,
    htmlToWarn,
    [divSyntax, ctx],
    [footnoteReference, ctx],
    [headings, ctx], // headingSections depends on this
  ];

  if (options.noSections === false) {
    plugins.push(headingSections); // theorems depends on this
  }

  plugins.push(
    [extractFrontmatter, ctx], // theorems depends on this
    [theorems, ctx],
    [cover, ctx],

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
