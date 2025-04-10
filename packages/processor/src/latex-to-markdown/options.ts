import { PluginOptions as LatexConvertOptions } from '@unified-latex/unified-latex-to-hast';
import { PluginOptions as LatexParseOptions } from '@unified-latex/unified-latex-util-parse';
import { Options as HtmlConvertOptions } from 'rehype-remark';
import { PluggableList } from 'unified';

import { mintedToPre } from '../plugins/code/minted-to-pre';
import { descriptionToDl } from '../plugins/definition-list';
import { Context } from './context';
import { createHastTransforms } from './hast-transforms';
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
          textsuperscript: { signature: 'm' },
          textsubscript: { signature: 'm' },
          sout: { signature: 'm' },
          mintinline: { signature: 'm m' },
        },
      },
      latexAstTransforms: createLatexastTransforms(ctx),
      latexAstToHtmlAstOptions: createLatexMacroToHastHandlers(ctx),
      htmlAstTransforms: createHastTransforms(ctx),
      htmlAstToMdAstOptions: {
        handlers: createRehypeRemarkHandlers(ctx),
      },
      mdAstTransforms: createLatexMdAstTransforms(ctx),
    },
  };
}

function createLatexMacroToHastHandlers(
  _ctx: Context,
): LatexConvertOptions {
  return {
    environmentReplacements: {
      minted: mintedToPre,
      description: descriptionToDl,
    },
  };
}

function createLatexMdAstTransforms(ctx: Context): PluggableList {
  return [[addFrontmatter, ctx], formatBreak];
}
