import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('itemize to ul', async () => {
  const markdown = await testProcessor.latex(String.raw`
    Let.
    \begin{itemize}
    \item one
    \item two
    \end{itemize}
    me.
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    Let.

    * one

    * two

    me.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(`
    <p>Let.</p>
    <ul>
      <li>
        <p>one</p>
      </li>
      <li>
        <p>two</p>
      </li>
    </ul>
    <p>me.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test('enumerate to ol with setcounter', async () => {
  const latex = String.raw`
    Let.
    \begin{enumerate}
    \setcounter{enumi}{7}
    \item one
    \item two
    \end{enumerate}
    me.
  `;
  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    Let.

    8. one

    9. two

    me.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(expectedMarkdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p>Let.</p>
    <ol start="8">
      <li>
        <p>one</p>
      </li>
      <li>
        <p>two</p>
      </li>
    </ol>
    <p>me.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test('description to dl', async () => {
  const markdown = await testProcessor.latex(String.raw`
    Let.
    \begin{description}
    \item[one] two
    \item three
    \item[four] five
    \end{description}
    me.
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    Let.

    one
    :   two
    :   three

    four
    :   five

    me.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(`
    <p>Let.</p>
    <dl>
      <dt>one</dt>
      <dd>two
      </dd>
      <dd>three
      </dd>
      <dt>four</dt>
      <dd>five
      </dd>
    </dl>
    <p>me.</p>
  `);

  expect(html).toBe(expectedHtml);
});
