import { expect, test } from 'vitest';

// @ts-ignore
import { pdfLatexToHtml } from '../../../test-utils/pdflatex-to-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('heading with counter', async () => {
  const latex = String.raw`
    \section{Hello}
    \fancysection{Hello}
    text.
  `;

  const markdown = await testProcessor.latex(latex);
  console.log(markdown);

  // const expectedMarkdown = unindentStringAndTrim(`
  //   ## Hello

  //   text.
  // `);

  // expect(markdown).toBe(expectedMarkdown);

  // const html = await testProcessor.md(markdown, {
  //   noSections: false,
  // });

  // const expectedHtml = unindentStringAndTrim(`
  //   <section id="hello">
  //     <h2><span class="count">1</span> Hello</h2>
  //     <p>text.</p>
  //   </section>
  // `);

  // expect(html).toBe(expectedHtml);
});

test.only('syntax bug', async () => {
  const latex = String.raw`
    \newcommand{\R}{\mathbb{R}}
    \newcommand{\st}{\text{ s.t. }}

    \begin{document}

    \section{Section 1}
    \begin{equation}
    \label{eq:S1}
    \exists M \in \R \st \forall x \in S, x \leq M.
    \end{equation}
    \section{Section 2}
    \subsection{Subsection 2.1}

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  console.log(markdown);

  // const expectedMarkdown = unindentStringAndTrim(`
  //   ## Hello

  //   text.
  // `);

  // expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, {
    state: {
      maths: {
        mathsAsTex: false,
        mathsFontName: 'computerModern',
        syntaxHighlight: false,
      },
    },
  });
  console.log(html);

  // const expectedHtml = unindentStringAndTrim(`
  //   <section id="hello">
  //     <h2><span class="count">1</span> Hello</h2>
  //     <p>text.</p>
  //   </section>
  // `);

  // expect(html).toBe(expectedHtml);
});
