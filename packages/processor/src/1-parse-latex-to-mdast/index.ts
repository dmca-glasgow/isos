import { expandDocumentMacrosPlugin } from './latex-ast-plugins/expand-macros';
import { expandMathOperatorPlugin } from './latex-ast-plugins/expand-math-ops';
import { handlers } from './rehype-remark-handlers';
import { Root } from 'hast';
import rehypeRemark from 'rehype-remark';
import { unified } from 'unified';

import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';

import { remarkDefaultPlugins } from '../utils/remark';
import { replaceTildeWithSpace } from './latex-ast-plugins/replace-tilde-with-space';

export async function parseLatexToMdast(latex: string) {
  const parsed = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString, {
      macros: {
        // signatures are defined in section 3 of:
        // https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/l3packages/xparse.pdf
        sidenote: { signature: 'm' },
        title: { signature: 'om' },
      },
    })
    .parse(latex);

  const latexAst = await unified()
    .use(expandDocumentMacrosPlugin)
    .use(expandMathOperatorPlugin)
    .use(replaceTildeWithSpace) // maybe use this? https://github.com/goodproblems/remark-mdx-math-enhanced
    .run(parsed);

  const hast = await unified()
    // @ts-expect-error
    .use(unifiedLatexToHast)
    .run(latexAst);

  const mdast = await unified()
    .use(rehypeRemark, { handlers })
    .use(remarkDefaultPlugins)
    // .use(() => (tree) => {
    //   console.log(JSON.stringify(tree, null, 2));
    // })
    .run(hast as Root);

  // console.dir(latexAst, { depth: null });
  // console.dir(hast, { depth: null });
  // console.dir(mdast, { depth: null });

  return {
    mdast,
  };
}
