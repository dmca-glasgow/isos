import { PluggableList } from 'unified';

import { headingLabels } from '../../plugins/headings/mdast-heading-labels';
import { inlineImages } from '../../plugins/images/inline-images';
import { deleteToDoubleTilde } from '../../plugins/strikethrough/delete-to-double-tilde';
import { theoremLabelAsId } from '../../plugins/theorems-proofs/theorem-label-as-id';
import { Context } from '../context';
import { Options } from '../options';

export function createMdastTransforms(
  ctx: Context,
  options: Partial<Options>,
): PluggableList {
  return [
    deleteToDoubleTilde,
    headingLabels,
    [inlineImages, ctx, options],
    [theoremLabelAsId, ctx],
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
  ];
}
