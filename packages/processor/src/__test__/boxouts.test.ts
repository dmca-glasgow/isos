import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

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
    <div id="example-1" class="boxout example">
      <p><span class="type">Example <span class="count">1.</span></span> An <code>example\\n</code> of <em>this</em>!</p>
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
