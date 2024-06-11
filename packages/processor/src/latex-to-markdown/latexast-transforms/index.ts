import { insertParbreaksAroundDisplayMaths } from './display-maths';
import { expandDocumentMacrosPlugin } from './expand-macros';
import { expandMathOperatorPlugin } from './expand-math-ops';
import { extractTheoremDefinitions } from './extract-theorem-definitions';
import { PluggableList } from 'unified';

import { Context } from '../context';
import { insertParbreaksAroundEnumerate } from './enumerate';
import { replaceTildeWithSpace } from './replace-tilde-with-space';

export function createLatexastTransforms(ctx: Context): PluggableList {
  return [
    expandDocumentMacrosPlugin,
    expandMathOperatorPlugin,
    [extractTheoremDefinitions, ctx],
    replaceTildeWithSpace, // maybe use this? https://github.com/goodproblems/remark-mdx-math-enhanced
    insertParbreaksAroundDisplayMaths,
    insertParbreaksAroundEnumerate,
  ];
}
