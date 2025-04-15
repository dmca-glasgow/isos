import { ProcessorOptions } from '@mdx-js/mdx';
// import { createSvg } from '../utils/icons';
import { PluggableList } from 'unified';

// import { visit } from 'unist-util-visit';

import { defListHastHandlers } from '../../plugins/definition-list';
import { Context } from '../context';
import { Options } from '../options';
import { createWrapper } from './wrapper';

export const processorOptions: ProcessorOptions = {
  outputFormat: 'function-body',
  elementAttributeNameCase: 'html',
  providerImportSource: '@mdx-js/preact',
  remarkRehypeOptions: {
    handlers: {
      ...defListHastHandlers,
    },
  },
};

export function createRehypePlugins(
  ctx: Context,
  options: Pick<Options, 'noWrapper'>,
) {
  const plugins = createRehypeFragmentPlugins(ctx, options);

  if (!options.noWrapper) {
    plugins.push([createWrapper, ctx]);
  }
  return plugins;
}

// export async function toHast(
//   children: PhrasingContent[],
//   ctx: Context,
//   options: Partial<Options> = {},
// ) {
//   const processor = unified().use(
//     createRehypeFragmentPlugins(ctx, options),
//   );

//   const root: Root = {
//     type: 'root',
//     children,
//   };
//   const hast = (await processor.run(root)) as Root;
//   return hast.children as ElementContent[];
// }

function createRehypeFragmentPlugins(
  _ctx: Context,
  _options: Partial<Options> = {},
): PluggableList {
  return [
    // () => (tree: Root) => {
    //   visit(tree, 'element', (node: Element) => {
    //     if (node.tagName === 'table') {
    //       console.dir(node, { depth: null });
    //     }
    //   });
    // },
    // TODO:
    // [
    // autolinkHeadings,
    // {
    //   content: createSvg('link-icon') as any,
    //   properties: { className: 'link' },
    // },
    // ],
  ];
}
