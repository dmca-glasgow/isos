import { Root } from 'mdast';
import { unified } from 'unified';

export async function transformMdastToJsx(mdast: Root) {
  const jsx = await unified()
    //
    .run(mdast);

  // console.dir(jsx, { depth: null });

  return {
    jsx,
  };
}
