import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
// @ts-ignore
import { pdfLatexToHtml } from '../../../test-utils/pdflatex-to-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('render a theorem', async () => {
  const latex = unindentStringAndTrim(String.raw`
    \documentclass{article}
    \usepackage{amsthm}
    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}
    \begin{document}
    \begin{theorem}
    An \verb|example\n| of \emph{this}!
    \end{theorem}
    \end{document}
  `);

  // const latexHtml = await pdfLatexToHtml(latex);
  // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 1.</strong> An<code> example\\n</code> of<em> this</em>!</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::: {#thm-1}
    An \`example\\n\` of *this*!
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);

  // const expectedQuartoHtml = unindentStringAndTrim(`
  //   <div id="thm-1" class="theorem">
  //     <p><span class="theorem-title"><strong>Theorem 1</strong></span> An <code>example\\n</code> of <em>this</em>!</p>
  //   </div>
  // `);

  // expect(quartoHtml).toBe(expectedQuartoHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 1</strong></span> An <code>example\\n</code> of <em>this</em>!</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('render a theorem with name', async () => {
  const latex = unindentStringAndTrim(String.raw`
    \documentclass{article}
    \usepackage{amsthm}
    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}
    \begin{document}
    \begin{theorem}[Pythagorean]
    Cras mattis.

    Cras justo odio.
    \end{theorem}
    \end{document}
  `);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::: {#thm-1 name="Pythagorean"}
    Cras mattis.

    Cras justo odio.
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 1 (Pythagorean)</strong></span> Cras mattis.</p>
      <p>Cras justo odio.</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('render a theorem by id', async () => {
  const latex = unindentStringAndTrim(String.raw`
    \documentclass{article}
    \usepackage{amsthm}
    \theoremstyle{definition}
    \usepackage{hyperref}
    \usepackage[noabbrev, capitalise, nameinlink]{cleveref}
    \newtheorem{theorem}{Theorem}
    \begin{document}

    \begin{theorem}[Ho ha] \label{thm:line}
    Cras mattis.

    Cras justo odio.
    \end{theorem}

    See~\cref{thm:line}.
    \end{document}
  `);

  // const latexHtml = await pdfLatexToHtml(latex);
  // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 1.</strong> Cras mattis.</p>
  //   <p>Cras justo odio.</p>
  //   <p>See Theorem 1.</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::: {#thm-line name="Ho ha"}
    Cras mattis.

    Cras justo odio.
    :::

    See @thm-line.
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);

  // const expectedQuartoHtml = unindentStringAndTrim(`
  //   <div id="thm-line" class="theorem">
  //     <p><span class="theorem-title"><strong>Theorem 1 (ho ha)</strong></span> Cras mattis.</p>
  //     <p>Cras justo odio.</p>
  //   </div>
  //   <p>See <a href="#thm-line" class="quarto-xref">Theorem 1</a>.</p>
  // `);

  // expect(quartoHtml).toBe(expectedQuartoHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-line">
      <p><span class="title"><strong>Theorem 1 (Ho ha)</strong></span> Cras mattis.</p>
      <p>Cras justo odio.</p>
    </div>
    <p>See <a href="#thm-line" class="ref">Theorem 1</a>.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test.skip('ignore an unsupported boxout', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}
    \theoremstyle{definition}
    \newtheorem{theorem2}{Theorem}
    \begin{document}
    \begin{theorem2}
    An \\verb|example\\n| of \\emph{this}!
    \end{theorem2}
    \end{document}
  `;
  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    An \`example\\n\` of *this*!
  `);

  expect(markdown).toBe(expectedMarkdown);
});
