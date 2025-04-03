import { ProcessorOptions } from '@mdx-js/mdx';
import { ElementContent } from 'hast';
import { PhrasingContent, Root } from 'mdast';
// import { createSvg } from '../utils/icons';
import { PluggableList, unified } from 'unified';

import { Context } from '../context';
import { Options } from '../options';
import { createWrapper } from './wrapper';

export const processorOptions: ProcessorOptions = {
  outputFormat: 'function-body',
  elementAttributeNameCase: 'html',
  providerImportSource: '@mdx-js/preact',
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

export async function toHast(
  children: PhrasingContent[],
  ctx: Context,
  options: Partial<Options> = {},
) {
  const processor = unified().use(
    createRehypeFragmentPlugins(ctx, options),
  );

  const root: Root = {
    type: 'root',
    children,
  };
  const hast = (await processor.run(root)) as Root;
  return hast.children as ElementContent[];
}

function createRehypeFragmentPlugins(
  _ctx: Context,
  _options: Partial<Options> = {},
): PluggableList {
  return [
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
