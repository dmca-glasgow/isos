import { PluggableList } from 'unified';

import { trimVerbatim } from '../../plugins/code/trim-verbatim';
import { setSideNotes } from '../../plugins/footnotes/latexast-set-sidenotes';
import { figureCaptionToImageTitle } from '../../plugins/images/figure-caption-to-image-title';
import { equationLabelToId } from '../../plugins/maths/equation-label-to-id';
// import { extractFancyTitle } from './extract-fancytitle';
import { extractTheoremDefinitions } from '../../plugins/refs-and-counts/extract-theorem-definitions';
import { tableCaptionToData } from '../../plugins/tables/table-caption-to-data';
import { Context } from '../context';
import { insertParbreaksAroundBlockElements } from './block-elements';
import { expandDocumentMacrosPlugin } from './expand-macros';
import { expandMathOperatorPlugin } from './expand-math-ops';

// import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    [setSideNotes, ctx],
    [extractTheoremDefinitions, ctx],

    trimVerbatim,
    // replaceTildeWithSpace,
    figureCaptionToImageTitle,
    expandDocumentMacrosPlugin,
    expandMathOperatorPlugin,
    equationLabelToId,
    // [extractFancyTitle, ctx],
    insertParbreaksAroundBlockElements,
    tableCaptionToData,
  ];
}
