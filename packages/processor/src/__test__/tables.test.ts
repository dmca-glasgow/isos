import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('tables', async () => {
  const latex = String.raw`
    \begin{tabular}{lcr}
    Beep & Pharetra & Commodo Pellentesque \\
    beep & 1024 & xyz \\
    \end{tabular}
  `;

  const markdown = await testProcessor.latex(latex);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    | Beep | Pharetra | Commodo Pellentesque |
    | :--- | :------: | -------------------: |
    | beep |   1024   |                  xyz |
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expected = unindentStringAndTrim(`
    <table>
      <thead>
        <tr>
          <th style="text-align:left;">Beep</th>
          <th style="text-align:center;">Pharetra</th>
          <th style="text-align:right;">Commodo Pellentesque</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align:left;">beep</td>
          <td style="text-align:center;">1024</td>
          <td style="text-align:right;">xyz</td>
        </tr>
      </tbody>
    </table>
  `);

  expect(html).toBe(expected);
});
