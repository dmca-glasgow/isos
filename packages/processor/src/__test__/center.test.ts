import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test.skip('parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{center}
    Christian Voigt
    \\end{center}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::center
    Christian Voigt
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="center">
      <p>Christian Voigt</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
