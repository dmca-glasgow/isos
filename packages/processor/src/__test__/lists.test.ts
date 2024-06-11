import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{definition} \\label{CMD1.1}
    Let.
    \\begin{enumerate}
    \\item[(1)] one
    \\item[(2)] two
    \\end{enumerate}
    me.
    \\end{definition}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::definition{id="CMD1.1"}
    Let.

    1) one

    2) two

    me.
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div id="cmd11" class="boxout definition">
      <p><span class="type">Definition <span class="count">1.</span></span> Let.</p>
      <ol>
        <li>
          <p>one</p>
        </li>
        <li>
          <p>two</p>
        </li>
      </ol>
      <p>me.</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
