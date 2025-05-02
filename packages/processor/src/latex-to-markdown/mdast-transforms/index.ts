import { PluggableList } from 'unified';

import { headingLabels } from '../../plugins/headings/mdast-heading-labels';
import { deleteToDoubleTilde } from '../../plugins/strikethrough/delete-to-double-tilde';
import { theoremLabelAsId } from '../../plugins/theorems-proofs/theorem-label-as-id';
import { Context } from '../context';
import { Options } from '../options';
import { inlineImages } from './inline-images';

export function createMdastTransforms(
  ctx: Context,
  options: Partial<Options>,
): PluggableList {
  return [
    deleteToDoubleTilde,
    headingLabels,
    [inlineImages, ctx, options],
    [theoremLabelAsId, ctx],
  ];
}
