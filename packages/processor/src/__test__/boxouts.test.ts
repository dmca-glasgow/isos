import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../utils/unindent-string';
import { testProcessor } from '../utils/unit-test-processor';

test('render a boxout', async () => {
  const latex = `
    \\begin{example}
    An \\verb|example\\n| of \\emph{this}!
    \\end{example}
  `;

  const markdown = `
    :::example
    An \`example\\n\` of *this*!
    :::
  `;

  const html = await testProcessor.both(latex, markdown);

  const expectedHtml = unindentStringAndTrim(`
    <div class="boxout example" id="example-1"><span class="type">Example 1</span>
      <p>An <code>example\\n</code> of <em>this</em>!</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('ignore an unsupported boxout', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{example2}
    An \\verb|example\\n| of \\emph{this}!
    \\end{example2}
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    An \`example\\n\` of *this*!
  `);

  expect(markdown).toBe(expectedMarkdown);
});
