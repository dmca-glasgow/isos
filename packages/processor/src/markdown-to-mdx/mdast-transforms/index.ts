import { PluggableList } from 'unified';

import { inlineCodeHighlight } from '../../plugins/code/inline-code-highlight';
import { divSyntax } from '../../plugins/div-syntax/mdx-divs';
import { dashesToEndashEmdash } from '../../plugins/endash-emdash';
import { footnoteReference } from '../../plugins/footnotes/footnote-reference';
import { headingSections } from '../../plugins/headings/heading-sections';
import { headings } from '../../plugins/headings/mdx-headings';
import { imageAttributes } from '../../plugins/images/image-attributes';
import { pandocImplicitFigures } from '../../plugins/images/pandoc-implicit-figures';
import { mathMetaToId } from '../../plugins/maths/math-meta-to-id';
import { tableCaptionToFigure } from '../../plugins/tables/table-caption-to-figure';
import { theorems } from '../../plugins/theorems-proofs/mdx-theorems';
import { Context } from '../context';
import { Options } from '../options';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { extractFrontmatter } from './extract-frontmatter';
import { warn } from './warn';

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
    [headings, ctx], // headingSections depends on this
  ];

  if (options.noSections === false) {
    plugins.push(headingSections); // theorems depends on this
  }

  plugins.push(
    [extractFrontmatter, ctx], // theorems depends on this
    [theorems, ctx],
    [divSyntax, ctx],

    dashesToEndashEmdash,
    inlineCodeHighlight,
    imageAttributes,
    pandocImplicitFigures,
    mathMetaToId,
    tableCaptionToFigure,
    footnoteReference,
    warn,

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
