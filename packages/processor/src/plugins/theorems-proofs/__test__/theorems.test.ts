import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
// @ts-ignore
import { pdfLatexToHtml } from '../../../test-utils/pdflatex-to-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('theorem', async () => {
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

test('theorem with name', async () => {
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

test('theorem with id', async () => {
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

test('theorems with section counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[section]
    \newtheorem{lemma}[theorem]{Lemma}

    \begin{document}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \end{document}
  `;

  // const latexHtml = await pdfLatexToHtml(latex);
  // // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 0.1.</strong> Some text</p>
  //   <p><strong>Lemma 0.2.</strong> Some text</p>
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 1.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.2.</strong> Some text</p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.3.</strong> Some text</p>
  //   <p><strong>Lemma 1.4.</strong> Some text</p>
  //   <p><strong>2</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 2.1.</strong> Some text</p>
  //   <p><strong>Lemma 2.2.</strong> Some text</p>
  //   <p><strong>2.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 2.3.</strong> Some text</p>
  //   <p><strong>Lemma 2.4.</strong> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: section
      lemma:
        referenceCounter: theorem
    ---

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ## My section

    ::: {#thm-2}
    Some text
    :::

    ::: {#lem-2}
    Some text
    :::

    ### My subsection

    ::: {#thm-3}
    Some text
    :::

    ::: {#lem-3}
    Some text
    :::

    ## My section

    ::: {#thm-4}
    Some text
    :::

    ::: {#lem-4}
    Some text
    :::

    ### My subsection

    ::: {#thm-5}
    Some text
    :::

    ::: {#lem-5}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 0.1</strong></span> Some text</p>
    </div>
    <div class="definition lemma" id="lem-1">
      <p><span class="title"><strong>Lemma 0.2</strong></span> Some text</p>
    </div>
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <div class="definition theorem" id="thm-2">
        <p><span class="title"><strong>Theorem 1.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-2">
        <p><span class="title"><strong>Lemma 1.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-3">
          <p><span class="title"><strong>Theorem 1.3</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-3">
          <p><span class="title"><strong>Lemma 1.4</strong></span> Some text</p>
        </div>
      </section>
    </section>
    <section id="my-section-1">
      <h2><span class="count">2</span> My section</h2>
      <div class="definition theorem" id="thm-4">
        <p><span class="title"><strong>Theorem 2.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-4">
        <p><span class="title"><strong>Lemma 2.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection-1">
        <h3><span class="count">2.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-5">
          <p><span class="title"><strong>Theorem 2.3</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-5">
          <p><span class="title"><strong>Lemma 2.4</strong></span> Some text</p>
        </div>
      </section>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('theorems with subsection counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[subsection]
    \newtheorem{lemma}[theorem]{Lemma}

    \begin{document}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \end{document}
  `;

  // const latexHtml = await pdfLatexToHtml(latex);
  // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 0.0.2.</strong> Some text</p>
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 1.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.0.2.</strong> Some text</p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.1.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.2.</strong> Some text</p>
  //   <p><strong>2</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 2.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 2.0.2.</strong> Some text</p>
  //   <p><strong>2.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 2.1.1.</strong> Some text</p>
  //   <p><strong>Lemma 2.1.2.</strong> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: subsection
      lemma:
        referenceCounter: theorem
    ---

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ## My section

    ::: {#thm-2}
    Some text
    :::

    ::: {#lem-2}
    Some text
    :::

    ### My subsection

    ::: {#thm-3}
    Some text
    :::

    ::: {#lem-3}
    Some text
    :::

    ## My section

    ::: {#thm-4}
    Some text
    :::

    ::: {#lem-4}
    Some text
    :::

    ### My subsection

    ::: {#thm-5}
    Some text
    :::

    ::: {#lem-5}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 0.0.1</strong></span> Some text</p>
    </div>
    <div class="definition lemma" id="lem-1">
      <p><span class="title"><strong>Lemma 0.0.2</strong></span> Some text</p>
    </div>
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <div class="definition theorem" id="thm-2">
        <p><span class="title"><strong>Theorem 1.0.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-2">
        <p><span class="title"><strong>Lemma 1.0.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-3">
          <p><span class="title"><strong>Theorem 1.1.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-3">
          <p><span class="title"><strong>Lemma 1.1.2</strong></span> Some text</p>
        </div>
      </section>
    </section>
    <section id="my-section-1">
      <h2><span class="count">2</span> My section</h2>
      <div class="definition theorem" id="thm-4">
        <p><span class="title"><strong>Theorem 2.0.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-4">
        <p><span class="title"><strong>Lemma 2.0.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection-1">
        <h3><span class="count">2.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-5">
          <p><span class="title"><strong>Theorem 2.1.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-5">
          <p><span class="title"><strong>Lemma 2.1.2</strong></span> Some text</p>
        </div>
      </section>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('theorems with subsubsection counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[subsubsection]
    \newtheorem{lemma}[theorem]{Lemma}

    \begin{document}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsubsection{My subsubsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \end{document}
  `;

  // const latexHtml = await pdfLatexToHtml(latex);
  // // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 0.0.0.2.</strong> Some text</p>
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 1.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.0.0.2.</strong> Some text</p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.1.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.0.2.</strong> Some text</p>
  //   <p><strong>1.1.1</strong></p>
  //   <p><strong>My subsubsection</strong></p>
  //   <p><strong>Theorem 1.1.1.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.1.2.</strong> Some text</p>
  //   <p><strong>1.2</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.2.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.2.0.2.</strong> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: subsubsection
      lemma:
        referenceCounter: theorem
    ---

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ## My section

    ::: {#thm-2}
    Some text
    :::

    ::: {#lem-2}
    Some text
    :::

    ### My subsection

    ::: {#thm-3}
    Some text
    :::

    ::: {#lem-3}
    Some text
    :::

    #### My subsubsection

    ::: {#thm-4}
    Some text
    :::

    ::: {#lem-4}
    Some text
    :::

    ### My subsection

    ::: {#thm-5}
    Some text
    :::

    ::: {#lem-5}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 0.0.0.1</strong></span> Some text</p>
    </div>
    <div class="definition lemma" id="lem-1">
      <p><span class="title"><strong>Lemma 0.0.0.2</strong></span> Some text</p>
    </div>
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <div class="definition theorem" id="thm-2">
        <p><span class="title"><strong>Theorem 1.0.0.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-2">
        <p><span class="title"><strong>Lemma 1.0.0.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-3">
          <p><span class="title"><strong>Theorem 1.1.0.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-3">
          <p><span class="title"><strong>Lemma 1.1.0.2</strong></span> Some text</p>
        </div>
        <section id="my-subsubsection">
          <h4><span class="count">1.1.1</span> My subsubsection</h4>
          <div class="definition theorem" id="thm-4">
            <p><span class="title"><strong>Theorem 1.1.1.1</strong></span> Some text</p>
          </div>
          <div class="definition lemma" id="lem-4">
            <p><span class="title"><strong>Lemma 1.1.1.2</strong></span> Some text</p>
          </div>
        </section>
      </section>
      <section id="my-subsection-1">
        <h3><span class="count">1.2</span> My subsection</h3>
        <div class="definition theorem" id="thm-5">
          <p><span class="title"><strong>Theorem 1.2.0.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-5">
          <p><span class="title"><strong>Lemma 1.2.0.2</strong></span> Some text</p>
        </div>
      </section>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('theorems with paragraph counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[paragraph]
    \newtheorem{lemma}[theorem]{Lemma}

    \begin{document}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsubsection{My subsubsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \end{document}
  `;

  // const latexHtml = await pdfLatexToHtml(latex);
  // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 0.0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 0.0.0.0.2.</strong> Some text</p>
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 1.0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.0.0.0.2.</strong> Some text</p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.1.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.0.0.2.</strong> Some text</p>
  //   <p><strong>1.1.1</strong></p>
  //   <p><strong>My subsubsection</strong></p>
  //   <p><strong>Theorem 1.1.1.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.1.0.2.</strong> Some text</p>
  //   <p><strong>1.2</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.2.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.2.0.0.2.</strong> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: paragraph
      lemma:
        referenceCounter: theorem
    ---

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ## My section

    ::: {#thm-2}
    Some text
    :::

    ::: {#lem-2}
    Some text
    :::

    ### My subsection

    ::: {#thm-3}
    Some text
    :::

    ::: {#lem-3}
    Some text
    :::

    #### My subsubsection

    ::: {#thm-4}
    Some text
    :::

    ::: {#lem-4}
    Some text
    :::

    ### My subsection

    ::: {#thm-5}
    Some text
    :::

    ::: {#lem-5}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 0.0.0.0.1</strong></span> Some text</p>
    </div>
    <div class="definition lemma" id="lem-1">
      <p><span class="title"><strong>Lemma 0.0.0.0.2</strong></span> Some text</p>
    </div>
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <div class="definition theorem" id="thm-2">
        <p><span class="title"><strong>Theorem 1.0.0.0.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-2">
        <p><span class="title"><strong>Lemma 1.0.0.0.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-3">
          <p><span class="title"><strong>Theorem 1.1.0.0.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-3">
          <p><span class="title"><strong>Lemma 1.1.0.0.2</strong></span> Some text</p>
        </div>
        <section id="my-subsubsection">
          <h4><span class="count">1.1.1</span> My subsubsection</h4>
          <div class="definition theorem" id="thm-4">
            <p><span class="title"><strong>Theorem 1.1.1.0.1</strong></span> Some text</p>
          </div>
          <div class="definition lemma" id="lem-4">
            <p><span class="title"><strong>Lemma 1.1.1.0.2</strong></span> Some text</p>
          </div>
        </section>
      </section>
      <section id="my-subsection-1">
        <h3><span class="count">1.2</span> My subsection</h3>
        <div class="definition theorem" id="thm-5">
          <p><span class="title"><strong>Theorem 1.2.0.0.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-5">
          <p><span class="title"><strong>Lemma 1.2.0.0.2</strong></span> Some text</p>
        </div>
      </section>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('theorems with subparagraph counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[subparagraph]
    \newtheorem{lemma}[theorem]{Lemma}

    \begin{document}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \section{My section}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subsubsection{My subsubsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \paragraph{My paragraph}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \subparagraph{My subparagraph}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \end{document}
  `;

  // const latexHtml = await pdfLatexToHtml(latex);
  // // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>Theorem 0.0.0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 0.0.0.0.0.2.</strong> Some text</p>
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Theorem 1.0.0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.0.0.0.0.2.</strong> Some text</p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.1.0.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.0.0.0.2.</strong> Some text</p>
  //   <p><strong>1.1.1</strong></p>
  //   <p><strong>My subsubsection</strong></p>
  //   <p><strong>Theorem 1.1.1.0.0.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.1.0.0.2.</strong> Some text</p>
  //   <p><strong>My paragraph</strong></p>
  //   <p><strong>Theorem 1.1.1.0.0.3.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.1.0.0.4.</strong> Some text</p>
  //   <p><strong>My subparagraph</strong></p>
  //   <p><strong>Theorem 1.1.1.0.0.5.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.1.0.0.6.</strong> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: subparagraph
      lemma:
        referenceCounter: theorem
    ---

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ## My section

    ::: {#thm-2}
    Some text
    :::

    ::: {#lem-2}
    Some text
    :::

    ### My subsection

    ::: {#thm-3}
    Some text
    :::

    ::: {#lem-3}
    Some text
    :::

    #### My subsubsection

    ::: {#thm-4}
    Some text
    :::

    ::: {#lem-4}
    Some text
    :::

    ##### My paragraph

    ::: {#thm-5}
    Some text
    :::

    ::: {#lem-5}
    Some text
    :::

    ###### My subparagraph

    ::: {#thm-6}
    Some text
    :::

    ::: {#lem-6}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 0.0.0.0.0.1</strong></span> Some text</p>
    </div>
    <div class="definition lemma" id="lem-1">
      <p><span class="title"><strong>Lemma 0.0.0.0.0.2</strong></span> Some text</p>
    </div>
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <div class="definition theorem" id="thm-2">
        <p><span class="title"><strong>Theorem 1.0.0.0.0.1</strong></span> Some text</p>
      </div>
      <div class="definition lemma" id="lem-2">
        <p><span class="title"><strong>Lemma 1.0.0.0.0.2</strong></span> Some text</p>
      </div>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-3">
          <p><span class="title"><strong>Theorem 1.1.0.0.0.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-3">
          <p><span class="title"><strong>Lemma 1.1.0.0.0.2</strong></span> Some text</p>
        </div>
        <section id="my-subsubsection">
          <h4><span class="count">1.1.1</span> My subsubsection</h4>
          <div class="definition theorem" id="thm-4">
            <p><span class="title"><strong>Theorem 1.1.1.0.0.1</strong></span> Some text</p>
          </div>
          <div class="definition lemma" id="lem-4">
            <p><span class="title"><strong>Lemma 1.1.1.0.0.2</strong></span> Some text</p>
          </div>
          <section id="my-paragraph">
            <h5>My paragraph</h5>
            <div class="definition theorem" id="thm-5">
              <p><span class="title"><strong>Theorem 1.1.1.1.0.1</strong></span> Some text</p>
            </div>
            <div class="definition lemma" id="lem-5">
              <p><span class="title"><strong>Lemma 1.1.1.1.0.2</strong></span> Some text</p>
            </div>
            <section id="my-subparagraph">
              <h6>My subparagraph</h6>
              <div class="definition theorem" id="thm-6">
                <p><span class="title"><strong>Theorem 1.1.1.1.1.1</strong></span> Some text</p>
              </div>
              <div class="definition lemma" id="lem-6">
                <p><span class="title"><strong>Lemma 1.1.1.1.1.2</strong></span> Some text</p>
              </div>
            </section>
          </section>
        </section>
      </section>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('theorems with reference and section counters', async () => {
  const latex = unindentStringAndTrim(String.raw`
    \documentclass{article}
    \usepackage{amsthm}

    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}[subsection]
    \newtheorem{lemma}{Lemma}[section]
    \newtheorem{corollary}[theorem]{Corollary}
    \newtheorem{proposition}[theorem]{Proposition}
    \newtheorem{conjecture}[lemma]{Conjecture}
    \newtheorem{definition}{Definition}
    \newtheorem*{example}{Example}
    \newtheorem{exercise}[theorem]{Exercise}
    \theoremstyle{remark}
    \newtheorem{solution}[lemma]{Solution}
    \newtheorem*{remark}{Remark}

    \begin{document}
    \section{My section}
    \subsection{My subsection}
    \begin{theorem} Some text \end{theorem}
    \begin{lemma} Some text \end{lemma}
    \begin{corollary} Some text \end{corollary}
    \begin{proposition} Some text \end{proposition}
    \begin{conjecture} Some text \end{conjecture}
    \section*{My section}
    \begin{definition} Some text \end{definition}
    \begin{example} Some text \end{example}
    \begin{exercise} Some text \end{exercise}
    \begin{remark} Some text \end{remark}
    \subsection{My subsection}
    \begin{solution} Some text \end{solution}
    \begin{exercise} Some text \end{exercise}
    \begin{proof} Some text \end{proof}
    \begin{solution} Some text \end{solution}
    \end{document}
  `);

  // const latexHtml = await pdfLatexToHtml(latex);
  // // console.log(latexHtml);

  // const expectedLatexHtml = unindentStringAndTrim(`
  //   <p><strong>1</strong></p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>1.1</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><strong>Theorem 1.1.1.</strong> Some text</p>
  //   <p><strong>Lemma 1.1.</strong> Some text</p>
  //   <p><strong>Corollary 1.1.2.</strong> Some text</p>
  //   <p><strong>Proposition 1.1.3.</strong> Some text</p>
  //   <p><strong>Conjecture 1.2.</strong> Some text</p>
  //   <p><strong>My section</strong></p>
  //   <p><strong>Definition 1.</strong> Some text</p>
  //   <p><strong>Example.</strong> Some text</p>
  //   <p><strong>Exercise 1.1.4.</strong> Some text</p>
  //   <p><em>Remark.</em> Some text</p>
  //   <p><strong>1.2</strong></p>
  //   <p><strong>My subsection</strong></p>
  //   <p><em>Solution</em> 1.3<em>.</em> Some text</p>
  //   <p><strong>Exercise 1.2.1.</strong> Some text</p>
  //   <p><em>Proof.</em> Some text</p>
  //   <p><em>Solution</em> 1.4<em>.</em> Some text</p>
  //   <p>1</p>
  // `);

  // expect(latexHtml).toBe(expectedLatexHtml);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ---
    theorems:
      theorem:
        numberWithin: subsection
      lemma:
        numberWithin: section
      corollary:
        referenceCounter: theorem
      proposition:
        referenceCounter: theorem
      conjecture:
        referenceCounter: lemma
      example:
        unnumbered: true
      exercise:
        referenceCounter: theorem
      solution:
        referenceCounter: lemma
      remark:
        unnumbered: true
    ---

    ## My section

    ### My subsection

    ::: {#thm-1}
    Some text
    :::

    ::: {#lem-1}
    Some text
    :::

    ::: {#cor-1}
    Some text
    :::

    ::: {#prp-1}
    Some text
    :::

    ::: {#cnj-1}
    Some text
    :::

    ## My section {.unnumbered}

    ::: {#def-1}
    Some text
    :::

    ::: {#exm-1}
    Some text
    :::

    ::: {#exr-1}
    Some text
    :::

    ::: {#rem-1}
    Some text
    :::

    ### My subsection

    ::: {#sol-1}
    Some text
    :::

    ::: {#exr-2}
    Some text
    :::

    ::: {.proof}
    Some text
    :::

    ::: {#sol-2}
    Some text
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <section id="my-section">
      <h2><span class="count">1</span> My section</h2>
      <section id="my-subsection">
        <h3><span class="count">1.1</span> My subsection</h3>
        <div class="definition theorem" id="thm-1">
          <p><span class="title"><strong>Theorem 1.1.1</strong></span> Some text</p>
        </div>
        <div class="definition lemma" id="lem-1">
          <p><span class="title"><strong>Lemma 1.1</strong></span> Some text</p>
        </div>
        <div class="definition corollary" id="cor-1">
          <p><span class="title"><strong>Corollary 1.1.2</strong></span> Some text</p>
        </div>
        <div class="definition proposition" id="prp-1">
          <p><span class="title"><strong>Proposition 1.1.3</strong></span> Some text</p>
        </div>
        <div class="definition conjecture" id="cnj-1">
          <p><span class="title"><strong>Conjecture 1.2</strong></span> Some text</p>
        </div>
      </section>
    </section>
    <section id="my-section-1">
      <h2>My section</h2>
      <div class="definition" id="def-1">
        <p><span class="title"><strong>Definition 1</strong></span> Some text</p>
      </div>
      <div class="definition example">
        <p><span class="title"><strong>Example</strong></span> Some text</p>
      </div>
      <div class="definition exercise" id="exr-1">
        <p><span class="title"><strong>Exercise 1.1.4</strong></span> Some text</p>
      </div>
      <div class="remark">
        <p><span class="title"><em>Remark</em>. </span>Some text</p>
      </div>
      <section id="my-subsection-1">
        <h3><span class="count">1.2</span> My subsection</h3>
        <div class="remark solution" id="sol-1">
          <p><span class="title"><em>Solution 1.3</em>. </span>Some text</p>
        </div>
        <div class="definition exercise" id="exr-2">
          <p><span class="title"><strong>Exercise 1.2.1</strong></span> Some text</p>
        </div>
        <div class="remark proof">
          <p><span class="title"><em>Proof</em>. </span>Some text<span class="qed">◻</span></p>
        </div>
        <div class="remark solution" id="sol-2">
          <p><span class="title"><em>Solution 1.4</em>. </span>Some text</p>
        </div>
      </section>
    </section>
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
