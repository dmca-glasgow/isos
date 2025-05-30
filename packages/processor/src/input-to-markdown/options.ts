import { PluginOptions as LatexConvertOptions } from '@unified-latex/unified-latex-to-hast';
import { PluginOptions as LatexParseOptions } from '@unified-latex/unified-latex-util-parse';
import { Options as HtmlConvertOptions } from 'rehype-remark';
import { PluggableList } from 'unified';

import { mintedToPre } from '../plugins/code/minted-to-pre';
import { descriptionToDl } from '../plugins/definition-list';
import { footnoteMarkToRef } from '../plugins/footnotes/footnote-mark-text-to-ref-def';
import { footnoteToRefDef } from '../plugins/footnotes/footnote-to-ref-def';
import {
  altToCaptionAttribute,
  captionAttributeToAlt,
} from '../plugins/images/formatted-caption';
import { imageToPandocFigure } from '../plugins/images/image-to-pandoc-figure';
import {
  mathsMetaToPandocAttributes,
  pandocAttributesToMathsMeta,
} from '../plugins/maths/formatted-maths';
import { codeToTableCaption } from '../plugins/tables/formatted-table-caption';
import { createTheoremHandlers } from '../plugins/theorems-proofs/latex-ast-theorem';
import { Context } from './context';
import { createHastTransforms } from './hast-transforms';
import { createLatexastTransforms } from './latexast-transforms';
import { createMdastTransforms } from './mdast-transforms';
import { addFrontmatter } from './mdast-transforms/add-frontmatter';
import { formatBreak } from './mdast-transforms/format-break';
import { createRehypeRemarkHandlers } from './rehyperemark-handlers';
import { nbspToSpace } from './string-transforms/nbsp-to-space';

export type Options = {
  filePath: string;
  type: 'latex' | 'markdown';
  frontmatter: {};
  noInlineImages: boolean;
  input: {
    latexStringTransforms: Array<(latex: string) => string>;
    markdownStringTransforms: Array<(markdown: string) => string>;
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
  markdownStringTransforms: Array<(markdown: string) => string>;
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
      markdownStringTransforms: [
        altToCaptionAttribute,
        pandocAttributesToMathsMeta,
      ],
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
          counterwithin: { signature: 'm m' },
          footnote: { signature: 'm' },
          setsidenotes: { signature: 'm' },

          author: { signature: 'o m' },
          affil: { signature: 'o m' },
          orcidlink: { signature: 'm' },

          notebox: { signature: 'm' },
          tipbox: { signature: 'm' },
          warningbox: { signature: 'm' },
          cautionbox: { signature: 'm' },
          importantbox: { signature: 'm' },
        },
      },
      latexAstTransforms: createLatexastTransforms(ctx),
      latexAstToHtmlAstOptions: createLatexToHastHandlers(ctx),
      htmlAstTransforms: createHastTransforms(ctx),
      htmlAstToMdAstOptions: {
        handlers: createRehypeRemarkHandlers(ctx),
      },
      mdAstTransforms: createLatexMdAstTransforms(ctx),
    },
    markdownStringTransforms: [
      captionAttributeToAlt,
      mathsMetaToPandocAttributes,
      codeToTableCaption,
      nbspToSpace,
    ],
  };
}

function createLatexToHastHandlers(ctx: Context): LatexConvertOptions {
  return {
    environmentReplacements: {
      ...createTheoremHandlers(ctx),
      minted: mintedToPre,
      description: descriptionToDl,
    },
  };
}

function createLatexMdAstTransforms(ctx: Context): PluggableList {
  return [
    [addFrontmatter, ctx],
    formatBreak,
    imageToPandocFigure,
    footnoteMarkToRef,
    footnoteToRefDef,
  ];
}
