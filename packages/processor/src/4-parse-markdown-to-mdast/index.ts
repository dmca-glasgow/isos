import { Root } from 'mdast';
import { unified } from 'unified';

export function parseMarkdownToMdast(markdown: string) {
  const mdast = unified()
    //
    .parse(markdown) as Root;

  // console.dir(precompiled, { depth: null });

  return {
    mdast,
  };
}
