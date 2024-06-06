import { headingAttributes } from '../3-markdown-to-js/remark-plugins/heading-attributes';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { createRemarkProcessor } from './remark';

export async function prepareMdast(markdown: string) {
  const processor = createRemarkProcessor([
    headingAttributes,
    escapeCharsForMdx,
  ]);
  const mdast = processor.parse(markdown);
  return processor.run(mdast as Root);
}

// https://mdxjs.com/docs/troubleshooting-mdx/#problems-writing-mdx
function escapeCharsForMdx() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/\{/g, '\\{').replace(/</g, '\\<');
    });
  };
}
