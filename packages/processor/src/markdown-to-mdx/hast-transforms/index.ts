import { Options } from '../options';
// import { createSvg } from '../utils/icons';
// import autolinkHeadings from 'rehype-autolink-headings';
import mathjaxBrowser from 'rehype-mathjax/browser';
// import mathjaxChtml from 'rehype-mathjax/chtml';
import mathjaxSvg from 'rehype-mathjax/svg';
// import rehypeRaw from 'rehype-raw';
// import rehypeSlug from 'rehype-slug';
import { PluggableList } from 'unified';

// import { visit } from 'unist-util-visit';
import { Context } from '../context';
import { createWrapper } from './wrapper';

const mathjaxOptions = {
  // chtml: {
  //   // minScale: 0.8,
  //   fontURL:
  //     'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
  // },
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

export function createRehypePlugins(ctx: Context, options: Options) {
  const plugins: PluggableList = [
    [options.mathsAsTex ? mathjaxBrowser : mathjaxSvg, mathjaxOptions],
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },

    // rehypeRaw,
    // rehypeSlug,
    // [
    //   autolinkHeadings,
    //   // {
    //   //   content: createSvg('link-icon') as any,
    //   //   properties: { className: 'link' },
    //   // },
    // ],
    // () => (tree) => {
    //   console.log(JSON.stringify(tree, null, 2));
    // },
  ];
  if (!options.noWrapper) {
    plugins.push([createWrapper, ctx]);
  }
  return plugins;
}
