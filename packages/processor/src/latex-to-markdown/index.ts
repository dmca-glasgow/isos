import { Root as HastRoot } from 'hast';
import { Root as MDastRoot } from 'mdast';
import rehypeRemark from 'rehype-remark';
import { unified } from 'unified';

import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';

import { createRemarkProcessor } from '../shared-utils/remark-pipeline';
import { Context } from './context';
import { createLatexastTransforms } from './latexast-transforms';
import { createMdastTransforms } from './mdast-transforms';
import { addFrontmatter } from './mdast-transforms/add-frontmatter';
import { formatBreak } from './mdast-transforms/format-break';
import { Options, defaultOptions } from './options';
import { createRehypeRemarkHandlers } from './rehyperemark-handlers';
import { FileType } from './utils/parse-file-path';

export async function inputToMarkdown(
  ctx: Context,
  options: Partial<Options> = {},
) {
  const mdast = await getMdast(ctx);
  const processor = createRemarkProcessor(
    createMdastTransforms(ctx, {
      ...defaultOptions,
      ...options,
    }),
  );
  const precompiled = await processor.run(mdast);
  const markdown = processor.stringify(precompiled as MDastRoot).trim();
  return markdown;
}

function getMdast(ctx: Context) {
  switch (ctx.type) {
    case FileType.latex:
      return parseLatexToMdast(ctx);
    default:
      return createRemarkProcessor().parse(ctx.content);
  }
}

export async function parseLatexToMdast(ctx: Context) {
  const parsed = unified()
    .use(unifiedLatexFromString, {
      macros: {
        // signatures are defined in section 3 of:
        // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
        sidenote: { signature: 'm' },
        title: { signature: 'om' },
        underline: { signature: 'm' }, // TODO: create PR in unified-latex-ctan?
        fancysection: { signature: 'm' },
        exsheetnumber: { signature: 'm' },
      },
    })
    .parse(ctx.content);

  const latexAst = await unified()
    .use(createLatexastTransforms(ctx))
    .run(parsed);

  const hast = await unified()
    .use(unifiedLatexToHast)
    // @ts-expect-error
    .run(latexAst);

  const mdast = await createRemarkProcessor([
    [rehypeRemark, { handlers: createRehypeRemarkHandlers(ctx) }],
    [addFrontmatter, ctx],
    formatBreak,
  ]).run(hast as HastRoot);

  // console.dir(latexAst, { depth: null });
  // console.dir(hast, { depth: null });
  // console.dir(mdast, { depth: null });

  return mdast;
}
