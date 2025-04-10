import { PluggableList } from 'unified';

import { mintInlineToCode } from '../../plugins/code/mint-inline-to-code';
import { endashEmdashToDashes } from '../../plugins/endash-emdash';
import { Context } from '../context';

export function createHastTransforms(_ctx: Context): PluggableList {
  return [endashEmdashToDashes, mintInlineToCode];
}
