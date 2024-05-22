// import rehypeMath from 'rehype-math';
import { PluggableList } from 'unified';
// import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import { createSvg } from '../../utils/icons';
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
  ];
}
