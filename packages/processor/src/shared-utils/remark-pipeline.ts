import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, unified } from 'unified';

export function createRemarkProcessor(plugins: PluggableList = []) {
  return unified()
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(remarkParse)
    .use(function () {
      return function (tree) {
        // console.dir(tree, { depth: null });
      };
    })
    .use(remarkDirective)
    .use(remarkMath)
    .use(plugins)
    .use(remarkStringify);
}
