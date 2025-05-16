import { ProcessorOptions } from '@mdx-js/mdx';
// import { Root } from 'hast';
// import { createSvg } from '../utils/icons';
import { PluggableList } from 'unified';

// import { visit } from 'unist-util-visit';

import { defListHastHandlers } from '../../plugins/definition-list';
import { addDefaultAltText } from '../../plugins/images/default-image-alt';
import { addCounts } from '../../plugins/numbered-elements/mdx-hast-add-counts';
import atReferenceToLink from '../../plugins/references/at-reference-to-link';
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
  ctx: Context,
  _options: Partial<Options> = {},
): PluggableList {
  return [
    [addCounts, ctx],
    [atReferenceToLink, ctx], // depends on addCounts
    addDefaultAltText,

    // () => (tree: Root) => {
    //   console.dir(tree, { depth: null });
    //   // visit(tree, 'element', (node) => {
    //   //   if (node.tagName === 'img') {
    //   //     if (node.properties.alt === '') {
    //   //       node.properties.alt = 'image';
    //   //     }
    //   //   }
    //   // });
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
