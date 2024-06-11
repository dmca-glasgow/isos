import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

// https://mdxjs.com/docs/troubleshooting-mdx/#problems-writing-mdx
export function escapeCharsForMdx() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'text', (node) => {
      if (node.value) {
        node.value = node.value.replace(/\{/g, '\\{').replace(/</g, '\\<');
      }
    });
  };
}
