import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    \\textbf{Example 2.1}

    \\emph{Example 2.1}

    \\textit{Example 2.1}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    **Example 2.1**

    *Example 2.1*

    *Example 2.1*
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><strong>Example 2.1</strong></p>
    <p><em>Example 2.1</em></p>
    <p><em>Example 2.1</em></p>
  `);

  expect(html).toBe(expectedHtml);
});
