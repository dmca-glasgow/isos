import { Root } from 'mdast';
import { remarkDefinitionList } from 'remark-definition-list';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, Processor, unified } from 'unified';

import remarkDirective from './plugins/remark-directive';
import remarkGfm from './plugins/remark-gfm';
import { remarkSuperSub } from './plugins/super-sub';

type RemarkProcessor = Processor<Root, undefined, undefined, Root, string>;

export function createRemarkProcessor(
  plugins: PluggableList = [],
): RemarkProcessor {
  return (
    unified()
      .use(remarkParse)
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(remarkSuperSub)
      .use(remarkDefinitionList)
      .use(remarkGfm, { singleTilde: false })
      .use(remarkMath)

      .use(remarkDirective)

      .use(plugins)
      // .use(() => {
      //   return (tree) => {
      //     console.dir(tree, { depth: null });
      //   };
      // })
      .use(remarkStringify)
  );
}
