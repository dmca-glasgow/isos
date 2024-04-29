import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import { unifiedLatexFromString } from '@isos/unified-latex-util-parse';
import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';
import remarkDirective from 'remark-directive';
import rehypeStringify from 'rehype-stringify';
import { State } from 'hast-util-to-mdast';
import { TextDirective } from 'mdast-util-directive';
import { Root, Element } from 'hast';
import { Text, PhrasingContent } from 'mdast';
import { expandDocumentMacrosPlugin } from './expand-macros';
import remarkMath from 'remark-math';
import { InlineMath, Math } from 'mdast-util-math';

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
    // @ts-expect-error
    .use(unifiedLatexToHast)
    .run(latexAst);

  const mdast = await unified()
    .use(rehypeRemark, {
      handlers: {
        span: customSpanHandler,
        div: customDivHandler,
      },
    })

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

function customSpanHandler(state: State, node: Element) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
    if (className.includes('macro-sidenote')) {
      const result: TextDirective = {
        type: 'textDirective',
        name: 'sidenote',
        children: state.all(node) as PhrasingContent[],
      };

      state.patch(node, result);
      return result;
    }

    if (className.includes('inline-math')) {
      const math = node.children[0] as Text;

      const result: InlineMath = {
        type: 'inlineMath',
        value: math.value,
      };

      state.patch(node, result);
      return result;
    }
  }

  return state.all(node);
}

function customDivHandler(state: State, node: Element) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
    if (className.includes('display-math')) {
      const math = node.children[0] as Text;

      const result: Math = {
        type: 'math',
        value: math.value,
      };

      state.patch(node, result);
      return result;
    }
  }

  return state.all(node);
}
