import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('maths', async () => {
  const latex = String.raw`
    \documentclass{article}
    \begin{document}

    \section{Hello}

    \begin{equation}
    \tag{x}
    \label{eq:myref}
    x^2 - 5 x + 6 = 0
    \end{equation}

    Check out~\eqref{eq:myref}.

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ## Hello

    $$
    \begin{equation}x^{2} - 5 x + 6 = 0\label{label1}\end{equation}
    $$

    Check out $\ref{label1}$.
  `);

  // expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(expectedMarkdown, {
    state: {
      maths: {
        mathsAsTex: false,
        mathsFontName: 'termes',
        syntaxHighlight: false,
      },
    },
  });
  console.log(html);

  // const expectedHtml = unindentStringAndTrim(`
  //   <p><img src="image.png" alt="Image" /></p>
  // `);

  // expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});
