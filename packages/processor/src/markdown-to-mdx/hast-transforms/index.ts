import { ProcessorOptions } from '@mdx-js/mdx';
// import { Root } from 'hast';
// import { createSvg } from '../utils/icons';
import { PluggableList } from 'unified';

// import { visit } from 'unist-util-visit';

import { defListHastHandlers } from '../../plugins/definition-list';
import { footNotesToSideNotes } from '../../plugins/footnotes/footnotes-to-sidenotes';
import { replaceFootnoteRefDefs } from '../../plugins/footnotes/replace-ref-def';
import { addDefaultAltText } from '../../plugins/images/default-image-alt';
import { addMathsRefsAndCount } from '../../plugins/maths/add-maths-refs-and-count';
import atReferenceToLink from '../../plugins/refs-and-counts/at-reference-to-link';
import { addCounts } from '../../plugins/refs-and-counts/hast-add-counts';
import { Context } from '../context';
import { Options } from '../options';
import { removeEmptyParagraphs } from './remove-empty-paragraphs';
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
    addDefaultAltText,
    addMathsRefsAndCount,
    removeEmptyParagraphs,

    [replaceFootnoteRefDefs, ctx],
    [footNotesToSideNotes, ctx],
    // TODO:
    // [
    // autolinkHeadings,
    // {
    //   content: createSvg('link-icon') as any,
    //   properties: { className: 'link' },
    // },
    // ],

    // should be last
    [addCounts, ctx],
    [atReferenceToLink, ctx], // depends on addCounts

    // () => (tree: Root) => {
    //   console.dir(tree, { depth: null });
    // },
  ];
}
