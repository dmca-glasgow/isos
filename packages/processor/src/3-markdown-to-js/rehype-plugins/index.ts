// import rehypeMath from 'rehype-math';
import { createSvg } from '../../utils/icons';
import headings from 'rehype-autolink-headings';
// import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { PluggableList } from 'unified';

import { Context } from '../context';

export function createRehypePlugins(ctx: Context): PluggableList {
  return [
    // rehypeMath,
    // rehypeRaw,
    rehypeSlug,
    [
      headings,
      {
        content: createSvg('link-icon') as any,
        properties: { className: 'link' },
      },
    ],
    // () => (tree) => {
    //   console.log(JSON.stringify(tree, null, 2));
    // },
  ];
}
