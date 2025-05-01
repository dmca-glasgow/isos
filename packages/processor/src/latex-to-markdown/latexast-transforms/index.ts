import { PluggableList } from 'unified';

import { trimVerbatim } from '../../plugins/code/trim-verbatim';
// import { insertParbreaksAroundBlockElements } from './block-elements';
// import { expandDocumentMacrosPlugin } from './expand-macros';
// import { expandMathOperatorPlugin } from './expand-math-ops';
// import { extractFancyTitle } from './extract-fancytitle';
import { extractTheoremDefinitions } from '../../plugins/theorems-proofs/extract-theorem-definitions';
import { Context } from '../context';
import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    trimVerbatim,
    replaceTildeWithSpace,
    [extractTheoremDefinitions, ctx],
    // expandDocumentMacrosPlugin,
    // expandMathOperatorPlugin,
    // [extractFancyTitle, ctx],
    // insertParbreaksAroundBlockElements
  ];
}
