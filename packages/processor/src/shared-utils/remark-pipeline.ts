import { Root as MDastRoot } from 'mdast';
import { remarkDefinitionList } from 'remark-definition-list';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, Processor, unified } from 'unified';

import remarkGfm from '../plugins/remark-gfm';
import { remarkSuperSub } from '../plugins/super-sub';
import remarkDirective from '../plugins/theorems-proofs/remark-directive';

export type RemarkProcessor = Processor<
  MDastRoot,
  undefined,
  undefined,
  MDastRoot,
  string
>;

export function createRemarkProcessor(
  plugins: PluggableList = [],
): RemarkProcessor {
  return (
    unified()
      .use(remarkParse)
      .use(remarkGfm, { singleTilde: false })
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(remarkSuperSub)
      .use(remarkDefinitionList)
      // .use(function () {
      //   return function (tree) {
      //     // console.dir(tree, { depth: null });
      //   };
      // })
      .use(remarkDirective)
      .use(remarkMath)
      .use(plugins)
      .use(remarkStringify)
  );
}
