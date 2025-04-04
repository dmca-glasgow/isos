import { PluginOptions as LatexConvertOptions } from '@unified-latex/unified-latex-to-hast';
import { PluginOptions as LatexParseOptions } from '@unified-latex/unified-latex-util-parse';
import { Options as HtmlConvertOptions } from 'rehype-remark';
import { PluggableList } from 'unified';

import { Context } from './context';
import { createLatexastTransforms } from './latexast-transforms';
import { createMdastTransforms } from './mdast-transforms';
import { addFrontmatter } from './mdast-transforms/add-frontmatter';
import { formatBreak } from './mdast-transforms/format-break';
import { createRehypeRemarkHandlers } from './rehyperemark-handlers';

export type Options = {
  filePath: string;
  type: 'latex' | 'markdown';
  frontmatter: {};
  noInlineImages: boolean;
  input: {
    latexStringTransforms: Array<(latex: string) => string>;
    markdownStringTransforms: Array<(latex: string) => string>;
    mdAstTransforms: PluggableList;
  };
  latexToMdAst: {
    latexAstFromStringOptions: LatexParseOptions;
    latexAstTransforms: PluggableList;
    latexAstToHtmlAstOptions: LatexConvertOptions;
    htmlAstTransforms: PluggableList;
    htmlAstToMdAstOptions: HtmlConvertOptions;
    mdAstTransforms: PluggableList;
  };
};

export function createDefaultOptions(
  ctx: Context,
  opts?: Partial<Options>,
): Options {
  const noInlineImages = opts?.noInlineImages || false;
  return {
    ...ctx,
    noInlineImages,
    input: {
      // latexStringTransforms: [
      //   (str) => `${str}2`,
      //   (str) => `${str}.jpg`
      // ],
      latexStringTransforms: [],
      markdownStringTransforms: [],
      mdAstTransforms: createMdastTransforms(ctx, { noInlineImages }),
    },
    latexToMdAst: {
      latexAstFromStringOptions: {
        macros: {
          // signatures are defined in section 3 of:
          // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
          // sidenote: { signature: 'm' },
          // title: { signature: 'om' },
          // underline: { signature: 'm' },
          // fancysection: { signature: 'm' },
          // exsheetnumber: { signature: 'm' },
        },
      },
      latexAstTransforms: createLatexastTransforms(ctx),
      latexAstToHtmlAstOptions: {
        macroReplacements: createLatexMacroToHastHandlers(ctx),
      },
      htmlAstTransforms: [],
      htmlAstToMdAstOptions: {
        handlers: createRehypeRemarkHandlers(ctx),
      },
      mdAstTransforms: createLatexMdAstTransforms(ctx),
    },
  };
}

function createLatexMacroToHastHandlers(_ctx: Context) {
  return {};
}

function createLatexMdAstTransforms(ctx: Context): PluggableList {
  return [[addFrontmatter, ctx], formatBreak];
}
