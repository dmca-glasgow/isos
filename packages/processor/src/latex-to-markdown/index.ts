import { createLatexastTransforms } from './latexast-transforms';
import { createMdastTransforms } from './mdast-transforms';
import { handlers } from './rehyperemark-handlers';
import { Root as HastRoot } from 'hast';
import { Root as MDastRoot } from 'mdast';
import rehypeRemark from 'rehype-remark';
import { unified } from 'unified';

import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';

import { createRemarkProcessor } from '../shared-utils/remark-pipeline';
import { Context, createContext } from './context';
import { addFrontmatter } from './mdast-transforms/add-frontmatter';
import { formatBreak } from './mdast-transforms/format-break';
import { FileType } from './utils/parse-file-path';

export async function inputToMarkdown(type: FileType, content: string) {
  const ctx = createContext();
  const mdast = await getMdast(type, content, ctx);
  const processor = createRemarkProcessor(createMdastTransforms(ctx));
  const precompiled = await processor.run(mdast);
  return processor.stringify(precompiled as MDastRoot).trim();
}

function getMdast(type: FileType, content: string, ctx: Context) {
  switch (type) {
    case FileType.latex:
      return parseLatexToMdast(content, ctx);
    default:
      return createRemarkProcessor().parse(content);
  }
}

async function parseLatexToMdast(latex: string, ctx: Context) {
  const parsed = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString, {
      macros: {
        // signatures are defined in section 3 of:
        // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
        sidenote: { signature: 'm' },
        title: { signature: 'om' },
        underline: { signature: 'm' }, // TODO: create PR in unified-latex-ctan
        fancysection: { signature: 'm' },
      },
    })
    .parse(latex);

  const latexAst = await unified()
    .use(createLatexastTransforms(ctx))
    .run(parsed);

  const hast = await unified()
    // @ts-expect-error
    .use(unifiedLatexToHast)
    .run(latexAst);

  const mdast = await createRemarkProcessor([
    [rehypeRemark, { handlers }],
    [addFrontmatter, ctx],
    formatBreak,
  ]).run(hast as HastRoot);

  // console.dir(latexAst, { depth: null });
  // console.dir(hast, { depth: null });
  // console.dir(mdast, { depth: null });

  return mdast;
}
