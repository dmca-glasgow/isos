import { Options } from '../options';
import { ElementContent } from 'hast';
import { PhrasingContent, Root } from 'mdast';
// import { createSvg } from '../utils/icons';
// import autolinkHeadings from 'rehype-autolink-headings';
import mathjaxBrowser from 'rehype-mathjax/browser';
// import mathjaxChtml from 'rehype-mathjax/chtml';
import mathjaxSvg from 'rehype-mathjax/svg';
// import rehypeRaw from 'rehype-raw';
// import rehypeSlug from 'rehype-slug';
import { PluggableList, unified } from 'unified';

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

function createRehypeFragmentPlugins(
  ctx: Context,
  options: Partial<Options> = {}
) {
  const plugins: PluggableList = [];

  if (options.mathsAsTex) {
    plugins.push([mathjaxBrowser, mathjaxOptions]);
  } else {
    plugins.push([mathjaxSvg, mathjaxOptions]);
  }

  return plugins;
}

export function createRehypePlugins(ctx: Context, options: Options) {
  const plugins = createRehypeFragmentPlugins(ctx, options);

  // plugins.push(
  //   () => (tree) => {
  //     console.dir(tree, { depth: null });
  //   },

  //   rehypeRaw,
  //   rehypeSlug,
  //   [
  //     autolinkHeadings,
  //     // {
  //     //   content: createSvg('link-icon') as any,
  //     //   properties: { className: 'link' },
  //     // },
  //   ],
  //   () => (tree) => {
  //     console.log(JSON.stringify(tree, null, 2));
  //   },
  // );

  if (!options.noWrapper) {
    plugins.push([createWrapper, ctx]);
  }
  return plugins;
}

export async function toHast(
  children: PhrasingContent[],
  ctx: Context,
  options?: Partial<Options>
) {
  const processor = unified().use(
    createRehypeFragmentPlugins(ctx, options)
  );

  const root: Root = {
    type: 'root',
    children,
  };
  const hast = (await processor.run(root)) as Root;
  return hast.children as ElementContent[];
}
