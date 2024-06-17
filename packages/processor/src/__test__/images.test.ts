import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{center}\\includegraphics[scale=0.55]{./figs/Ex2-2-13reflection.png}\\end{center}
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    :::center
    ![](./figs/Ex2-2-13reflection.png)
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(`
    <div class="center">
      <p><img src="./figs/Ex2-2-13reflection.png" alt /></p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
