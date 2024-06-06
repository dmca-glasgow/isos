import { Root } from 'mdast';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { PluggableList, unified } from 'unified';

// import remarkMdxEnhanced from 'remark-mdx-math-enhanced';

export const remarkDefaultPlugins: PluggableList = [
  remarkDirective,
  remarkMath,
  remarkFrontmatter,
  // remarkMdxEnhanced
];

export function createRemarkProcessor(plugins: PluggableList = []) {
  return unified()
    .use(remarkParse)
    .use(remarkDefaultPlugins)
    .use(plugins)
    .use(remarkStringify);
}

export function parseMarkdownToMdast(markdown: string) {
  const mdast = createRemarkProcessor().parse(markdown) as Root;
  return { mdast };
}

export function serialiseMdastToMarkdown(mdast: Root) {
  const markdown = createRemarkProcessor().stringify(mdast);
  return { markdown };
}
