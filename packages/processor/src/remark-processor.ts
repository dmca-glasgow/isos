import { Root } from 'mdast';
import { remarkDefinitionList } from 'remark-definition-list';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, Processor, unified } from 'unified';
import { visit } from 'unist-util-visit';

import remarkGfm from './plugins/remark-gfm';
import { remarkSuperSub } from './plugins/super-sub';
import remarkDirective from './plugins/theorems-proofs/remark-directive';

export type RemarkProcessor = Processor<
  Root,
  undefined,
  undefined,
  Root,
  string
>;

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

      .use([remarkDirective, allowColonInText])
      .use(allowColonInText)

      .use(plugins)
      // .use(() => {
      //   return (tree) => {
      //     console.dir(tree, { depth: null });
      //   };
      // })
      .use(remarkStringify)
  );
}

function allowColonInText() {
  // due to allowing a whitespace character after : in remarkDirective
  // we need to handle the case of a colon used conventionally in text
  return (tree: Root) => {
    visit(tree, 'textDirective', (node) => {
      if (node.name.startsWith(' ') && node.children.length === 0) {
        Object.assign(node, {
          type: 'text',
          value: `:${node.name}`,
        });
      }
    });
  };
}
