import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';
import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import remarkDirective from 'remark-directive';
import rehypeStringify from 'rehype-stringify';
import { Root } from 'hast';
import { expandDocumentMacrosPlugin } from './latex-ast-plugins/expand-macros';
import remarkMath from 'remark-math';
import { handlers } from './rehype-remark-handlers';
import { expandMathOperatorPlugin } from './latex-ast-plugins/expand-math-ops';
import { replaceTildeWithSpace } from './latex-ast-plugins/replace-tilde-with-space';

export async function processLatex(latex: string) {
  const parsed = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString, {
      macros: {
        // signatures are defined in section 3 of:
        // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
        sidenote: { signature: 'm' },
      },
    })
    .parse(latex);

  const latexAst = await unified()
    .use(expandDocumentMacrosPlugin)
    .use(expandMathOperatorPlugin)
    .use(replaceTildeWithSpace)
    .run(parsed);

  const hast = await unified()
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

  // console.dir(latexAst, { depth: null });
  // console.dir(hast, { depth: null });
  // console.dir(mdast, { depth: null });
  // console.log(markdown);

  return {
    latexAst,
    hast,
    // HTML isn't serialised for production so just add getter for testing
    getHtml() {
      return unified()
        .use(rehypeStringify)
        .stringify(hast as Root);
    },
    mdast,
    markdown,
  };
}
