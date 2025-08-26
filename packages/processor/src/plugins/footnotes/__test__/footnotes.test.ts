import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('footnote', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{hyperref}
    \begin{document}

    Some text \footnote{
      text for \emph{footnote}

      Subsequent paragraphs are indented to show that they
      belong to the previous footnote.
    }~and \footnote{text for \emph{footnote}}.

    Another paragraph.

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    Some text [^1] and [^2].

    [^1]: text for *footnote*

        Subsequent paragraphs are indented to show that they belong to the previous footnote.

    [^2]: text for *footnote*

    Another paragraph.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section>
      <p>Some text <span class="sidenote"><sup class="sidenote-count"><a id="fn-1" href="#fn-ref-1">1</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref1" href="#fn-1">1</a> </sup><span>text for <em>footnote</em></span> <span>Subsequent paragraphs are indented to show that they belong to the previous footnote.</span></small><span class="sidenote-label">)</span></span> and <span class="sidenote"><sup class="sidenote-count"><a id="fn-2" href="#fn-ref-2">2</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref2" href="#fn-2">2</a> </sup><span>text for <em>footnote</em></span></small><span class="sidenote-label">)</span></span>.</p>
      <p>Another paragraph.</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('footnotemark and footnotetext', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{snotez}
    \setsidenotes{footnote=true}
    \begin{document}

    Some text \footnotemark[1] and \footnotemark[2].

    Another paragraph.

    \footnotetext[1]{
      text for \emph{footnote} 1

      Subsequent paragraphs are indented to show that they belong to the previous footnote.
    }

    \footnotetext[2]{
      text for \emph{footnote} 2
    }

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    Some text [^1] and [^2].

    Another paragraph.

    [^1]: text for *footnote* 1

        Subsequent paragraphs are indented to show that they belong to the previous footnote.

    [^2]: text for *footnote* 2
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section>
      <p>Some text <span class="sidenote"><sup class="sidenote-count"><a id="fn-1" href="#fn-ref-1">1</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref1" href="#fn-1">1</a> </sup><span>text for <em>footnote</em> 1</span> <span>Subsequent paragraphs are indented to show that they belong to the previous footnote.</span></small><span class="sidenote-label">)</span></span> and <span class="sidenote"><sup class="sidenote-count"><a id="fn-2" href="#fn-ref-2">2</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref2" href="#fn-2">2</a> </sup><span>text for <em>footnote</em> 2</span></small><span class="sidenote-label">)</span></span>.</p>
      <p>Another paragraph.</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('footnotemark and footnotetext with no identifier', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{snotez}
    \setsidenotes{footnote=true}
    \begin{document}

    Some text \footnotemark and \footnotemark.

    Another paragraph.

    \footnotetext{
      text for \emph{footnote} 1

      Subsequent paragraphs are indented to show that they belong to the previous footnote.
    }

    \footnotetext{
      text for \emph{footnote} 2
    }

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  // TODO: I lose whitespace (before "and") and so far don't see how to get it back
  const expectedMarkdown = unindentStringAndTrim(String.raw`
    Some text :warn[footnote mark has no identifier]and :warn[footnote mark has no identifier].

    Another paragraph.

    :warn[footnote text has no identifier]

    :warn[footnote text has no identifier]
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section>
      <p>Some text <span class="warn">footnote mark has no identifier</span>and <span class="warn">footnote mark has no identifier</span>.</p>
      <p>Another paragraph.</p>
      <p><span class="warn">footnote text has no identifier</span></p>
      <p><span class="warn">footnote text has no identifier</span></p>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('footnote as footnote', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage[footnote]{snotez}
    \setsidenotes{footnote=false}
    \begin{document}

    Some text \footnotemark[1] and \footnotemark[2].

    Another paragraph.

    \footnotetext[1]{
      text for \emph{footnote} 1.

      Subsequent paragraphs are indented to show that they belong to the previous footnote.
    }

    \footnotetext[2]{
      text for \emph{footnote} 2.
    }

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ---
    reference-location: document
    ---

    Some text [^1] and [^2].

    Another paragraph.

    [^1]: text for *footnote* 1.

        Subsequent paragraphs are indented to show that they belong to the previous footnote.

    [^2]: text for *footnote* 2.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section>
      <p>Some text <sup class="fn-ref"><a href="#fn-1" id="#fn-ref-1">1</a></sup> and <sup class="fn-ref"><a href="#fn-2" id="#fn-ref-2">2</a></sup>.</p>
      <p>Another paragraph.</p>
    </section>
    <section class="footnotes">
      <h2>Footnotes</h2>
      <ol>
        <li id="fn-1">
          <p>text for <em>footnote</em> 1.</p>
          <p>Subsequent paragraphs are indented to show that they belong to the previous footnote. <a href="#fn-ref-1">↩</a></p>
        </li>
        <li id="fn-2">
          <p>text for <em>footnote</em> 2. <a href="#fn-ref-2">↩</a></p>
        </li>
      </ol>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // TODO: test for footnotes at the bottom

  // const pandocHtml = await markdownToPandocHtml(expectedMarkdown);
  // console.log(pandocHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});

test('footnotes with labels', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage[footnote]{snotez}
    \setsidenotes{footnote=false}
    \begin{document}

    Some text \footnote{An inline footnote.}~and \footnote{
      Another inline footnote.

      Subsequent paragraphs are indented to show that they
      belong to the previous footnote.
    }.

    Another paragraph.

    Some text \footnotemark[num] and \footnotemark[3].

    Another paragraph.

    \footnotetext[num]{
      A block footnote.

      Subsequent paragraphs are indented to show that they belong to the previous footnote.
    }

    \footnotetext[3]{
      Another block footnote.
    }

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ---
    reference-location: document
    ---

    Some text [^1] and [^2].

    [^1]: An inline footnote.

    [^2]: Another inline footnote.

        Subsequent paragraphs are indented to show that they belong to the previous footnote.

    Another paragraph.

    Some text [^num] and [^3].

    Another paragraph.

    [^num]: A block footnote.

        Subsequent paragraphs are indented to show that they belong to the previous footnote.

    [^3]: Another block footnote.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <section>
      <p>Some text <sup class="fn-ref"><a href="#fn-1" id="#fn-ref-1">1</a></sup> and <sup class="fn-ref"><a href="#fn-2" id="#fn-ref-2">2</a></sup>.</p>
      <p>Another paragraph.</p>
      <p>Some text <sup class="fn-ref"><a href="#fn-num" id="#fn-ref-num">3</a></sup> and <sup class="fn-ref"><a href="#fn-3" id="#fn-ref-3">4</a></sup>.</p>
      <p>Another paragraph.</p>
    </section>
    <section class="footnotes">
      <h2>Footnotes</h2>
      <ol>
        <li id="fn-1">
          <p>An inline footnote. <a href="#fn-ref-1">↩</a></p>
        </li>
        <li id="fn-2">
          <p>Another inline footnote.</p>
          <p>Subsequent paragraphs are indented to show that they belong to the previous footnote. <a href="#fn-ref-2">↩</a></p>
        </li>
        <li id="fn-num">
          <p>A block footnote.</p>
          <p>Subsequent paragraphs are indented to show that they belong to the previous footnote. <a href="#fn-ref-num">↩</a></p>
        </li>
        <li id="fn-3">
          <p>Another block footnote. <a href="#fn-ref-3">↩</a></p>
        </li>
      </ol>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const pandocHtml = await markdownToPandocHtml(expectedMarkdown);
  // console.log(pandocHtml);
});

test('footnote with display maths', async () => {
  const latex = String.raw`
    \documentclass{article}
    \newcommand{\eps}{\varepsilon}
    \newcommand{\N}{\mathbb{N}}
    \begin{document}

    a

    b \sidenote{c
    $$
    x
    $$

    d \cref{lem:1.8}

    \begin{align*}
    a_n
    \end{align*}
    }

    \begin{lemma} \label{lem:1.8}
    c
    \end{lemma}

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    a

    b [^1]

    [^1]: c



        $$
        x
        $$





        d @lem-1-8





        $$
        \begin{align*}a_{n}\end{align*}
        $$





    ::: {#lem-1-8}
    c
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>a</p>
    <p>b <span class="sidenote"><sup class="sidenote-count"><a id="fn-1" href="#fn-ref-1">1</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref1" href="#fn-1">1</a> </sup><span>c</span>
        <p class="maths"><code class="latex">x</code></p> <span>d <a href="#lem-1-8" class="ref">Lemma 1</a></span>
        <p class="maths"><code class="latex">\begin{align*}
    a_{n}
    \end{align*}</code></p>
      </small><span class="sidenote-label">)</span></span></p>
    <div class="definition lemma" id="lem-1-8">
      <p><span class="title"><strong>Lemma 1.</strong></span> c</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('footnote referencing other footnote', async () => {
  const latex = String.raw`
    \documentclass{article}
    \begin{document}

    a\sidenote{\label{Com2}b.}

    c\sidenote{d \cref{Com2}.}

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    a[^com-2]

    [^com-2]: b.

    c[^2]

    [^2]: d @com-2.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>a<span class="sidenote"><sup class="sidenote-count"><a id="fn-com-2" href="#fn-ref-com-2">1</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-refcom-2" href="#fn-com-2">1</a> </sup><span>b.</span></small><span class="sidenote-label">)</span></span></p>
    <p>c<span class="sidenote"><sup class="sidenote-count"><a id="fn-2" href="#fn-ref-2">2</a></sup><span class="sidenote-label"> (sidenote: </span><small class="sidenote-content"><sup class="sidenote-count"><a id="fn-ref2" href="#fn-2">2</a> </sup><span>d <a href="#com-2" class="ref">Sidenote 1</a>.</span></small><span class="sidenote-label">)</span></span></p>
  `);

  expect(html).toBe(expectedHtml);
});
