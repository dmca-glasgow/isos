import { PluggableList } from 'unified';

import { headingLabels } from '../../plugins/headings/mdast-heading-labels';
import { inlineImagesFromContext } from '../../plugins/images/inline-images-from-context';
import { deleteToDoubleTilde } from '../../plugins/strikethrough/delete-to-double-tilde';
import { theoremLabelAsId } from '../../plugins/theorems-proofs/theorem-label-as-id';
// import { inputToContents } from '../../plugins/transclusion/input-to-contents';
import { Context } from '../context';
import { Options } from '../options';

export function createMdastTransforms(
  ctx: Context,
  options: Partial<Options>,
): PluggableList {
  return [
    // [inputToContents, ctx],

    deleteToDoubleTilde,
    headingLabels,
    [inlineImagesFromContext, ctx, options],
    [theoremLabelAsId, ctx],
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
  ];
}
