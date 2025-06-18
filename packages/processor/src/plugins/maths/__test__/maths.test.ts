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

    $$
    x^2 - 5 x + 6 = 0
    $$

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ## Hello

    $$
    x^{2} - 5 x + 6 = 0
    $$
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, {
    // state: {
    //   maths: {
    //     mathsAsTex: false,
    //     mathsFontName: 'termes',
    //     syntaxHighlight: false,
    //   },
    // },
  });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section id="hello">
      <h2><span class="count">1</span> Hello</h2>
      <p class="maths"><code class="latex">x^{2} - 5 x + 6 = 0</code></p>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('maths equations', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsmath}
    \usepackage{hyperref}
    \usepackage[noabbrev, capitalise, nameinlink]{cleveref}
    \begin{document}

    \section{Hello}

    \begin{equation}
    \label{eq:myref1}
    x^2 - 5 x + 6 = 0
    \end{equation}

    \begin{equation}
    x^2 - 5 x + 6 = 0
    \end{equation}

    \begin{equation}
    \label{eq:myref3}
    x^2 - 5 x + 6 = 0
    \end{equation}

    Check out \autoref{eq:myref1} and \autoref{eq:myref2} and \autoref{eq:myref3}.

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ## Hello

    $$
    \begin{equation}x^{2} - 5 x + 6 = 0\end{equation}
    $$ {#eq-myref-1}

    $$
    \begin{equation}x^{2} - 5 x + 6 = 0\end{equation}
    $$

    $$
    \begin{equation}x^{2} - 5 x + 6 = 0\end{equation}
    $$ {#eq-myref-3}

    Check out @eq-myref-1 and @eq-myref-2 and @eq-myref-3.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, {
    // state: {
    //   maths: {
    //     mathsAsTex: false,
    //     mathsFontName: 'termes',
    //     syntaxHighlight: false,
    //   },
    // },
  });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section id="hello">
      <h2><span class="count">1</span> Hello</h2>
      <p id="eq-myref-1" class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(1)</span></p>
      <p class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(2)</span></p>
      <p id="eq-myref-3" class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(3)</span></p>
      <p>Check out <a href="#eq-myref-1" class="ref">Equation 1</a> and <span class="error">?@eq-myref-2</span> and <a href="#eq-myref-3" class="ref">Equation 3</a>.</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('maths with mathjax error', async () => {
  const latex = String.raw`
    i.e.  $\pounds 1$ wins
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    i.e. $\pounds 1$ wins
  `);

  expect(markdown).toBe(expectedMarkdown);

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

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>i.e. <code class="maths"><span class="mathjax-error">Undefined control sequence \pounds</span></code> wins</p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});
