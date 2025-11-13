import * as Ast from '@unified-latex/unified-latex-types';
import { Root as MDAstRoot } from 'mdast';

import { Fs } from '@isos/fs/types';

import { Context } from '../input-to-markdown/context';
import { embedLatexIncludes } from './latex-includes';
import { embedMarkdownIncludes } from './markdown-includes';

export type LaTeXResult = {
  latexAstRoot: Ast.Root;
  subFiles: string[];
};

export type MarkdownResult = {
  mdAstRoot: MDAstRoot;
  subFiles: string[];
};

export async function embedIncludes(
  ctx: Context,
  fs: Fs,
): Promise<LaTeXResult | MarkdownResult> {
  switch (ctx.type) {
    case 'markdown':
      return embedMarkdownIncludes(ctx, fs);
    case 'latex':
      return embedLatexIncludes(ctx, fs);
    default:
      throw new Error(`file type: "${ctx.type}" is not supported`);
  }
}
