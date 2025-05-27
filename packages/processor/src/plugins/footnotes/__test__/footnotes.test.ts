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

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Some text <sup class="fn-ref"><a href="#fn-1" id="#fn-ref-1">1</a></sup> and <sup class="fn-ref"><a href="#fn-2" id="#fn-ref-2">2</a></sup>.</p>
    <aside class="inline-fn" id="fn-1">
      <p><sup><a href="#fn-ref-1">1</a></sup> text for <em>footnote</em></p>
      <p>Subsequent paragraphs are indented to show that they belong to the previous footnote. <a href="#fn-ref-1">↩</a></p>
    </aside>
    <aside class="inline-fn" id="fn-2">
      <p><sup><a href="#fn-ref-2">2</a></sup> text for <em>footnote</em> <a href="#fn-ref-2">↩</a></p>
    </aside>
    <p>Another paragraph.</p>
  `);

  expect(html).toBe(expectedHtml);

  // TODO: test for footnotes at the bottom

  // const pandocHtml = await markdownToPandocHtml(expectedMarkdown);
  // console.log(pandocHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
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

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Some text <sup class="fn-ref"><a href="#fn-1" id="#fn-ref-1">1</a></sup> and <sup class="fn-ref"><a href="#fn-2" id="#fn-ref-2">2</a></sup>.</p>
    <aside class="inline-fn" id="fn-1">
      <p><sup><a href="#fn-ref-1">1</a></sup> text for <em>footnote</em> 1</p>
      <p>Subsequent paragraphs are indented to show that they belong to the previous footnote. <a href="#fn-ref-1">↩</a></p>
    </aside>
    <aside class="inline-fn" id="fn-2">
      <p><sup><a href="#fn-ref-2">2</a></sup> text for <em>footnote</em> 2 <a href="#fn-ref-2">↩</a></p>
    </aside>
    <p>Another paragraph.</p>
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

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    Some text :warn[footnote mark has no identifier]and :warn[footnote mark has no identifier].

    Another paragraph.

    :warn[footnote text has no identifier]

    :warn[footnote text has no identifier]
  `);

  // TODO: I lose whitespace (before "and") and so far don't see how to get it back

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Some text <span class="warn">footnote mark has no identifier</span>and <span class="warn">footnote mark has no identifier</span>.</p>
    <p>Another paragraph.</p>
    <p><span class="warn">footnote text has no identifier</span></p>
    <p><span class="warn">footnote text has no identifier</span></p>
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

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Some text <sup class="fn-ref"><a href="#fn-1" id="#fn-ref-1">1</a></sup> and <sup class="fn-ref"><a href="#fn-2" id="#fn-ref-2">2</a></sup>.</p>
    <p>Another paragraph.</p>
    <section class="footnotes">
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
