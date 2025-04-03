import { Root as MDastRoot } from 'mdast';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, Processor, unified } from 'unified';

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
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(remarkParse)
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
