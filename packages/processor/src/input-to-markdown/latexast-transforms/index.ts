import { PluggableList } from 'unified';

import { trimVerbatim } from '../../plugins/code/trim-verbatim';
import { extractTopMatter } from '../../plugins/cover/extract-top-matter';
import {
  fancyBoxedToSubSection,
  fancySectionToSection,
} from '../../plugins/fancy/fancy-section-to-section';
import { setSideNotes } from '../../plugins/footnotes/latexast-set-sidenotes';
import { figureToImage } from '../../plugins/images/figure-to-image';
// import { inlineFilesFromContext } from '../../plugins/includes/inline-files-from-context';
import { equationLabelToId } from '../../plugins/maths/equation-label-to-id';
// import { extractFancyTitle } from './extract-fancytitle';
import { extractTheoremDefinitions } from '../../plugins/refs-and-counts/extract-theorem-definitions';
import { tableCaptionToData } from '../../plugins/tables/table-caption-to-data';
import { Context } from '../context';
import { insertParbreaksAroundBlockElements } from './block-elements';
import { convertEmToEmph } from './convert-em-to-emph';
import { expandDocumentMacrosPlugin } from './expand-macros';
import { expandMathOperatorPlugin } from './expand-math-ops';

// import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    // [inlineFilesFromContext, ctx],
    [setSideNotes, ctx],
    [extractTheoremDefinitions, ctx],
    [extractTopMatter, ctx],

    trimVerbatim,
    convertEmToEmph,
    // replaceTildeWithSpace,
    figureToImage,
    expandDocumentMacrosPlugin,
    expandMathOperatorPlugin,
    equationLabelToId,
    // [extractFancyTitle, ctx],
    insertParbreaksAroundBlockElements,
    tableCaptionToData,
    fancySectionToSection,
    fancyBoxedToSubSection,
  ];
}
