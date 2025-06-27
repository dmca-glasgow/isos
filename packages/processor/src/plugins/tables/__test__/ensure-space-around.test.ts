import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('tables', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{amsthm}
    \theoremstyle{definition}
    \newtheorem{theorem}{Theorem}
    \begin{document}
    \begin{theorem}
    Hi.
    \begin{figure}[h!]
    \begin{tabular}{c|c|c}
    Date gilt matures   & Coupon &	Price  \\
      7th December 2028  & $6\%$ & $\pounds 120.66$\\
      7th June 2021 & $8\%$ & $\pounds 134.70$
    \end{tabular}
    \end{figure}
    Hello.
    \end{theorem}
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);
  // return;

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    ::: {#thm-1}
    Hi.



    | Date gilt matures | Coupon |       Price      |
    | :---------------: | :----: | :--------------: |
    | 7th December 2028 |  $6\%$ | $\pounds 120.66$ |
    |   7th June 2021   |  $8\%$ | $\pounds 134.70$ |



    Hello.
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(expectedMarkdown);
  // console.log(html);
  // return;

  const expectedHtml = unindentStringAndTrim(String.raw`
    <div class="definition theorem" id="thm-1">
      <p><span class="title"><strong>Theorem 1.</strong></span> Hi.</p>
      <table>
        <thead>
          <tr>
            <th style="text-align:center;">Date gilt matures</th>
            <th style="text-align:center;">Coupon</th>
            <th style="text-align:center;">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">7th December 2028</td>
            <td style="text-align:center;"><code class="latex">6\%</code></td>
            <td style="text-align:center;"><code class="latex">\pounds 120.66</code></td>
          </tr>
          <tr>
            <td style="text-align:center;">7th June 2021</td>
            <td style="text-align:center;"><code class="latex">8\%</code></td>
            <td style="text-align:center;"><code class="latex">\pounds 134.70</code></td>
          </tr>
        </tbody>
      </table>
      <p>Hello.</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(expectedMarkdown);
  // console.log(quartoHtml);
});
