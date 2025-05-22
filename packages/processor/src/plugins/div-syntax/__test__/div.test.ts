import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('image with counter', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{hyperref}
    \usepackage[noabbrev, capitalise, nameinlink]{cleveref}
    \begin{document}

    \section{Hello}
    \label{sec:hi}

    See \cref{sec:hi}.
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ## Hello {#sec-hi}

    See @sec-hi.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const quartoMarkdown = unindentStringAndTrim(`
    ## Introduction {#sec-introduction}

    ::: {#tbl-table}

    ![](table.png)

    An *image* treated like a table

    :::

    ::: {#tbl-chair}

    | A | B |
    |---|---|
    | C | D |

    An *image* treated like a chair

    :::

    See @sec-introduction and @tbl-table and @tbl-chair.
  `);

  const html = await testProcessor.md(quartoMarkdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <section id="sec-introduction">
      <h2><span class="count">1</span> Introduction</h2>
      <figure id="tbl-table">
        <figCaption>Table 1: An <em>image</em> treated like a table</figCaption>
        <img src="table.png" alt="Image" />
      </figure>
      <figure id="tbl-chair">
        <figCaption>Table 2: An <em>image</em> treated like a chair</figCaption>
        <table>
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C</td>
              <td>D</td>
            </tr>
          </tbody>
        </table>
      </figure>
      <p>See <a href="#sec-introduction" class="ref">Section 1</a> and <a href="#tbl-table" class="ref">Table 1</a> and <a href="#tbl-chair" class="ref">Table 2</a>.</p>
    </section>
  `);

  expect(html).toBe(expectedHtml);

  // const pandocHtml = await markdownToPandocHtml(expectedMarkdown);
  // console.log(pandocHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});
