import { createSvg } from '../../utils/icons';
import headings from 'rehype-autolink-headings';
import rehypeMathjax from 'rehype-mathjax/browser';
// import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { PluggableList } from 'unified';
import { visit } from 'unist-util-visit';

import { Context } from '../context';

export function createRehypePlugins(ctx: Context): PluggableList {
  return [
    [
      rehypeMathjax,
      {
        tex: {
          inlineMath: [
            ['$', '$'],
            // ['\\(', '\\)'],
          ],
          displayMath: [
            ['$$', '$$'],
            // [`\\[`, `\\]`],
          ],
        },
      },
    ],
    // rehypeRaw,
    // rehypeSlug,
    // () => (tree) => {
    //   visit(tree, 'element', (node) => {
    //     console.log(node);
    //   });
    // },
    // [
    //   headings,
    //   {
    //     content: createSvg('link-icon') as any,
    //     properties: { className: 'link' },
    //   },
    // ],
    // () => (tree) => {
    //   console.log(JSON.stringify(tree, null, 2));
    // },
  ];
}
