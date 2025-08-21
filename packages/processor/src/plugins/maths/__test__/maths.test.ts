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
    <h2 id="hello"><span class="count">1</span> Hello</h2>
    <p class="maths"><code class="latex">x^{2} - 5 x + 6 = 0</code></p>
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
    <h2 id="hello"><span class="count">1</span> Hello</h2>
    <p id="eq-myref-1" class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(1)</span></p>
    <p class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(2)</span></p>
    <p id="eq-myref-3" class="maths env-equation"><code class="latex">\begin{equation}x^{2} - 5 x + 6 = 0\end{equation}</code><span class="eq-count">(3)</span></p>
    <p>Check out <a href="#eq-myref-1" class="ref">Equation 1</a> and <span class="warn"><strong>unknown ref:</strong> <code>eq-myref-2</code></span> and <a href="#eq-myref-3" class="ref">Equation 3</a>.</p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test.only('maths equations bug', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsmath}
    \usepackage{hyperref}
    \usepackage[noabbrev, capitalise, nameinlink]{cleveref}
    \begin{document}

    \begin{equation}\label{S1}
    \exists M \in \R \st \forall x \in S, x \leq M.
    \end{equation}

    \begin{equation}\label{S2}
    \forall x \in S, \exists M \in \R, x \leq M
    \end{equation}

    In particular (\cref{S2}) will be true no matter what the subset $ S \subseteq \R $ is.
    The key difference between (\cref{S1}) and (\cref{S2}) is that in (\cref{S2}) the value of $ M $ is allowed to depend on $ x $ as $ M $ is
    specified after $ x $ in the statement; whereas in (\cref{S1}) the value of $ M $ must be specified first, and for the statement to be
    true, this value of $ M $ must be greater than or equal to every element of $ S $. You may find it helpful to record the possible
    dependence of $ M $ on $ x $ in (\cref{S2}) explicitly and write this statement as

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  console.log(markdown);

  // const expectedMarkdown = unindentStringAndTrim(String.raw`

  // `);

  // expect(markdown).toBe(expectedMarkdown);

  // const html = await testProcessor.md(markdown);
  // // console.log(html);

  // const expectedHtml = unindentStringAndTrim(String.raw`

  // `);

  // expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('maths with \\pounds', async () => {
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
        mathsFontName: 'computerModern',
        syntaxHighlight: false,
      },
    },
  });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>i.e. <code class="maths"><svg style="vertical-align: -0.018ex;" xmlns="http://www.w3.org/2000/svg" width="2.268ex" height="1.551ex" role="img" focusable="false" viewBox="0 -676 1000 684" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="MJX-1-GT-N-A3" d="M490 136C490 139 488 141 484 141C479 141 471 136 461 125C429 91 394 76 348 76C299 76 264 84 199 111C223 233 224 238 224 273L223 301L223 328L344 328L344 373L219 373C211 441 208 474 208 510C208 598 243 649 303 649C340 649 358 632 359 597C360 544 368 530 398 530C427 530 448 552 448 583C448 636 392 676 318 676C199 676 123 585 123 442C123 418 125 399 130 373L23 373L23 328L131 328C151 181 153 164 153 146C153 139 152 133 149 125C130 129 118 130 103 130C49 130 12 100 12 54C12 16 39-8 80-8C115-8 138 7 178 54C246 7 279-7 322-7C370-7 415 14 447 51C468 75 490 119 490 136M142 76C142 68 136 56 125 43C111 26 99 20 79 20C55 20 38 35 38 57C38 81 56 94 89 94C113 94 142 84 142 76Z"></path><path id="MJX-1-GT-N-31" d="M394 0L394 15C315 16 299 26 299 74L299 674L291 676L111 585L111 571C123 576 134 580 138 582C156 589 173 593 183 593C204 593 213 578 213 546L213 93C213 60 205 37 189 28C174 19 160 16 118 15L118 0Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math" data-latex="\pounds 1"><g data-mml-node="mtext" data-latex="\textsterling"><use data-c="A3" xlink:href="#MJX-1-GT-N-A3"></use></g><g data-mml-node="mn" data-latex="1" transform="translate(500,0)"><use data-c="31" xlink:href="#MJX-1-GT-N-31"></use></g></g></g></svg></code> wins</p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});
