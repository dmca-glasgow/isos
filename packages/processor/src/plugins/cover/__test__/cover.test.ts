import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('cover', async () => {
  const latex = String.raw`
    \documentclass{article}
    \begin{document}
    \title{How to \emph{Structure} a LaTeX Document}
    \author{David \emph{McArthur}}
    \date{29 \emph{May} 2025}
    \maketitle

    \begin{abstract}
    My abstract.

    Has multiple paragraphs.
    \end{abstract}

    \section{Introduction}

    Paragraph

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ---
    title: How to *Structure* a LaTeX Document
    date: 29 *May* 2025
    author:
      name: David *McArthur*
    abstract: |
      My abstract.

      Has multiple paragraphs.
    ---

    ## Introduction

    Paragraph
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
      <p class="author">Written by David <em>McArthur</em></p>
      <p class="date"><time datetime="2025-05-29">29 <em>May</em> 2025</time></p>
      <aside aria-labelledby="h-abstract">
        <h2 id="h-abstract">Abstract</h2>
        <p>My abstract.</p>
        <p>Has multiple paragraphs.</p>
      </aside>
    </header>
    <section id="introduction">
      <h2><span class="count">1</span> Introduction</h2>
      <p>Paragraph</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});

test('cover with just title', async () => {
  const latex = String.raw`
    \documentclass{article}
    \begin{document}
    \title{How to \emph{Structure} a LaTeX Document}
    \maketitle

    Hello

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ---
    title: How to *Structure* a LaTeX Document
    ---

    Hello
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
    </header>
    <p>Hello</p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});

test('cover with multiple authors with ORCIDs', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{authblk}
    \usepackage{orcidlink}
    \begin{document}
    \title{How to \emph{Structure} a LaTeX Document}
    \author[1]{David \emph{McArthur} \orcidlink{0000-0002-1825-0097}}
    \author[2]{Ivor Question \orcidlink{0000-0002-1825-0097}}
    \affil[1]{Department of Mathematics, University X}
    \affil[2]{Department of Biology, University Y}
    \date{29 \emph{May} 2025}
    \maketitle

    Hello

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ---
    title: How to *Structure* a LaTeX Document
    date: 29 *May* 2025
    author:
      - orcid: 0000-0002-1825-0097
        name: David *McArthur*
        affiliation: Department of Mathematics, University X
      - orcid: 0000-0002-1825-0097
        name: Ivor Question
        affiliation: Department of Biology, University Y
    ---

    Hello
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
      <div class="authors">
        <p>Written by:</p>
        <ul>
          <li>David <em>McArthur</em> <a href="https://orcid.org/0000-0002-1825-0097" target="_blank" class="orcid">ORCID Link</a>, <span class="affiliation">Department of Mathematics, University X</span></li>
          <li>Ivor Question <a href="https://orcid.org/0000-0002-1825-0097" target="_blank" class="orcid">ORCID Link</a>, <span class="affiliation">Department of Biology, University Y</span></li>
        </ul>
      </div>
      <p class="date"><time datetime="2025-05-29">29 <em>May</em> 2025</time></p>
    </header>
    <p>Hello</p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});
