import { expect, test } from 'vitest';

import { testProcessor, unindentStringAndTrim } from '@isos/test-utils';

test('render a boxout', async () => {
  const markdown = await testProcessor.latex(String.raw`
    \begin{example}
    An \verb|example\n| of \emph{this}!
    \end{example}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::example
    An \`example\\n\` of *this*!
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

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
