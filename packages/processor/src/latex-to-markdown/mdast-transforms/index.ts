import { headingLabels } from './heading-labels';
import { PluggableList } from 'unified';

import { Context } from '../context';

export function createMdastTransforms(ctx: Context): PluggableList {
  // console.log(ctx);
  return [
    // () => (tree: Root) => {
    //   tree
    // }
    headingLabels,
  ];
}
