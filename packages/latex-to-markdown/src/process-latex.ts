import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';
import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import remarkDirective from 'remark-directive';
import rehypeStringify from 'rehype-stringify';
import { Root } from 'hast';
import { expandDocumentMacrosPlugin } from './expand-macros';
import remarkMath from 'remark-math';
import { handlers } from './rehype-remark-handlers';
import { expandMathOperatorPlugin } from './expand-math-op';

export async function processLatex(latex: string) {
  const latexAst = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString, {
      macros: {
        // signatures are defined in section 3 of:
        // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
        sidenote: { signature: 'm' },
      },
    })
    .parse(latex);

  const hast = await unified()
    .use(expandDocumentMacrosPlugin)
    .use(expandMathOperatorPlugin)
    // @ts-expect-error
    .use(unifiedLatexToHast)
    .run(latexAst);

  const mdast = await unified()
    .use(rehypeRemark, { handlers })
    .run(hast as Root);

  const markdown = unified()
    .use(remarkMath)
    .use(remarkDirective)
    .use(remarkStringify)
    .stringify(mdast)
    .trim();

  return {
    latexAst,
    hast,
    html() {
      return unified()
        .use(rehypeStringify)
        .stringify(hast as Root);
    },
    mdast,
    markdown,
  };
}
