import { Options } from '../options';
import { createSvg } from '../utils/icons';
import headings from 'rehype-autolink-headings';
import mathjaxBrowser from 'rehype-mathjax/browser';
// import mathjaxChtml from 'rehype-mathjax/chtml';
import mathjaxSvg from 'rehype-mathjax/svg';
// import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { PluggableList } from 'unified';
import { visit } from 'unist-util-visit';

import { Context } from '../context';

const mathjaxOptions = {
  chtml: {
    // minScale: 0.8,
    fontURL:
      'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
  },
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
};

export function createRehypePlugins(
  ctx: Context,
  options?: Options
): PluggableList {
  return [
    [options?.mathsAsTex ? mathjaxBrowser : mathjaxSvg, mathjaxOptions],
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
