import { PluggableList } from 'unified';

import { Context } from '../context';
import { insertParbreaksAroundBlockElements } from './block-elements';
import { expandDocumentMacrosPlugin } from './expand-macros';
import { expandMathOperatorPlugin } from './expand-math-ops';
import { extractFancyTitle } from './extract-fancytitle';
import { extractTheoremDefinitions } from './extract-theorem-definitions';
import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    expandDocumentMacrosPlugin,
    expandMathOperatorPlugin,
    [extractTheoremDefinitions, ctx],
    [extractFancyTitle, ctx],
    replaceTildeWithSpace,
    insertParbreaksAroundBlockElements,
  ];
}
