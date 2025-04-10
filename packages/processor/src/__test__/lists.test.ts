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

test('enumerate to ol', async () => {
  const markdown = await testProcessor.latex(String.raw`
    Let.
    \begin{enumerate}
    \item one
    \item two
    \end{enumerate}
    me.
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    Let.

    1. one

    2. two

    me.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(`
    <p>Let.</p>
    <ol>
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
    \item[three] four
    \end{description}
    me.
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    Let.

    one
    :   two

    three
    :   four

    me.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p>Let.</p>
    <dl>
      <dt>one</dt>
      <dd>two
      </dd>
      <dt>three</dt>
      <dd>four
      </dd>
    </dl>
    <p>me.</p>
  `);

  expect(html).toBe(expectedHtml);
});
