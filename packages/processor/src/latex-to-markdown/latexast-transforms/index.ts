import { PluggableList } from 'unified';

import { trimVerbatim } from '../../plugins/code/trim-verbatim';
import { figureCaptionToImageTitle } from '../../plugins/images/figure-caption-to-image-title';
import { equationLabelToId } from '../../plugins/maths/equation-label-to-id';
// import { extractFancyTitle } from './extract-fancytitle';
import { extractTheoremDefinitions } from '../../plugins/refs-and-counts/extract-theorem-definitions';
import { Context } from '../context';
import { insertParbreaksAroundBlockElements } from './block-elements';
import { expandDocumentMacrosPlugin } from './expand-macros';
import { expandMathOperatorPlugin } from './expand-math-ops';
import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    trimVerbatim,
    replaceTildeWithSpace,
    figureCaptionToImageTitle,
    [extractTheoremDefinitions, ctx],
    expandDocumentMacrosPlugin,
    expandMathOperatorPlugin,
    equationLabelToId,
    // [extractFancyTitle, ctx],
    insertParbreaksAroundBlockElements,
  ];
}
