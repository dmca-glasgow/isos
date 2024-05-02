import { Root } from 'mdast';
import { unified } from 'unified';

export async function transformMdast(mdast: Root) {
  const precompiled = (await unified()
    // .use(rehypeRemark, { handlers })
    // .use(remarkMath)
    // .use(remarkDirective)
    .run(mdast)) as Root;

  // console.dir(precompiled, { depth: null });

  return {
    precompiled,
  };
}
