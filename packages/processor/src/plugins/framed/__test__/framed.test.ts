import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('framed environment', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{framed}
    \\begin{definition} A \\emph{matrix}.
    \\end{definition}
    \\vspace*{-4mm}
    \\end{framed}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::::framed
    ::: {#def-1}
    A *matrix*.
    :::
    ::::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="framed">
      <div class="definition" id="def-1">
        <p><span class="title"><strong>Definition 1.</strong></span> A <em>matrix</em>.</p>
      </div>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
