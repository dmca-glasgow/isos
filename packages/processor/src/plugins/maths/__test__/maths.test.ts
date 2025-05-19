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
    \usepackage{amsmath}
    \usepackage{hyperref}
    \usepackage[noabbrev, capitalise, nameinlink]{cleveref}
    \begin{document}

    \section{Hello2}

    \begin{equation}
    \label{eq:myref}
    x^2 - 5 x + 6 = 0
    \end{equation}

    Check out~\autoref{eq:myref}.

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  console.log(markdown);
  return;

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ## Hello

    $$
    \begin{equation}\label{eq:myref}x^{2} - 5 x + 6 = 0\end{equation}
    $$ {#eq-black-scholes}

    $$
    \begin{equation}\label{eq:myref}x^{2} - 5 x + 6 = 0\end{equation}
    $$ {#eq-black-scholes2}

    Check out @eq-myref.
  `);

  // expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, {
    state: {
      maths: {
        mathsAsTex: false,
        mathsFontName: 'termes',
        syntaxHighlight: false,
      },
    },
  });
  // console.log(html);

  // const expectedHtml = unindentStringAndTrim(`
  //   <p><img src="image.png" alt="Image" /></p>
  // `);

  // expect(html).toBe(expectedHtml);

  const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  console.log(quartoHtml);
});
