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

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
      <p class="author">Written by David <em>McArthur</em></p>
      <p class="date"><time datetime="2025-05-29">29 <em>May</em> 2025</time></p>
      <aside aria-labelledby="h-abstract" class="abstract">
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

test('cover with author with ORCID', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{orcidlink}
    \begin{document}
    \title{How to \emph{Structure} a LaTeX Document}
    \author{David \emph{McArthur} Esq. \orcidlink{0000-0002-1825-0097}}
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
      orcid: 0000-0002-1825-0097
      name: David *McArthur* Esq.
    ---

    Hello
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
      <p class="author">Written by David <em>McArthur</em> Esq. <a href="https://orcid.org/0000-0002-1825-0097" target="_blank" class="orcid" title="ORCID link"><svg viewBox="0 0 256 256">
            <path fill="#A6CE39" d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"></path>
            <g>
              <path fill="fff" d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z"></path>
              <path fill="fff" d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5 c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"></path>
              <path fill="fff" d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1 C84.2,46.7,88.7,51.3,88.7,56.8z"></path>
            </g>
          </svg></a></p>
      <p class="date"><time datetime="2025-05-29">29 <em>May</em> 2025</time></p>
    </header>
    <section>
      <p>Hello</p>
    </section>
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

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <header>
      <h1>How to <em>Structure</em> a LaTeX Document</h1>
      <div class="authors">
        <p>Written by:</p>
        <ul>
          <li>David <em>McArthur</em> <a href="https://orcid.org/0000-0002-1825-0097" target="_blank" class="orcid" title="ORCID link"><svg viewBox="0 0 256 256">
                <path fill="#A6CE39" d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"></path>
                <g>
                  <path fill="fff" d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z"></path>
                  <path fill="fff" d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5 c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"></path>
                  <path fill="fff" d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1 C84.2,46.7,88.7,51.3,88.7,56.8z"></path>
                </g>
              </svg></a>, <span class="affiliation">Department of Mathematics, University X</span></li>
          <li>Ivor Question <a href="https://orcid.org/0000-0002-1825-0097" target="_blank" class="orcid" title="ORCID link"><svg viewBox="0 0 256 256">
                <path fill="#A6CE39" d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"></path>
                <g>
                  <path fill="fff" d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z"></path>
                  <path fill="fff" d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5 c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"></path>
                  <path fill="fff" d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1 C84.2,46.7,88.7,51.3,88.7,56.8z"></path>
                </g>
              </svg></a>, <span class="affiliation">Department of Biology, University Y</span></li>
        </ul>
      </div>
      <p class="date"><time datetime="2025-05-29">29 <em>May</em> 2025</time></p>
    </header>
    <section>
      <p>Hello</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});
