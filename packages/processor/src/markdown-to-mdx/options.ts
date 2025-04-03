import { RunOptions } from '@mdx-js/mdx';
import { PluggableList } from 'unified';

import { Context } from './context';
import { createRehypePlugins } from './hast-transforms';
import { createMdastTransforms } from './mdast-transforms';
import { createRunOptions, createSidebarRunOptions } from './mdx-handlers';
import { MdxState } from './mdx-handlers/mdx-state';

export type Options = {
  noWrapper: boolean;
  noSections: boolean;
  markdownStringTransforms: Array<(latex: string) => string>;
  mdAstTransforms: PluggableList;
  htmlAstTransforms: PluggableList;
  mdxArticleRunOptions: RunOptions;
  mdxTOCRunOptions: RunOptions;
};

// export const defaultOptions: Options = {
//   noWrapper: false,
//   noSections: false,
// };

export function createDefaultOptions(
  mdxState: MdxState,
  ctx: Context,
  opts?: Partial<Options>,
): Options {
  const noWrapper = opts?.noWrapper || false;
  const noSections = opts?.noSections || false;
  return {
    noWrapper,
    noSections,
    // markdownStringTransforms: [
    //   (str) => `${str}2`,
    //   (str) => `${str}.jpg`
    // ],
    markdownStringTransforms: [],
    mdAstTransforms: createMdastTransforms(ctx, { noSections }),
    htmlAstTransforms: createRehypePlugins(ctx, { noWrapper }),
    mdxArticleRunOptions: createRunOptions(mdxState),
    mdxTOCRunOptions: createSidebarRunOptions(mdxState),
  };
}
