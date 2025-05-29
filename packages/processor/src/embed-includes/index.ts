import { Context } from '../input-to-markdown/context';
import { Options } from '../input-to-markdown/options';
import { embedLatexIncludes } from './latex-includes';
import { embedMarkdownIncludes } from './markdown-includes';

export async function embedIncludes(
  ctx: Context,
  options: Options,
): Promise<void> {
  switch (options.type) {
    case 'markdown':
      return embedMarkdownIncludes(ctx);
    case 'latex':
      return embedLatexIncludes(ctx);
    default:
      throw new Error(`file type: "${options.type}" is not supported`);
  }
}
