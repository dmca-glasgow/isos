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

test.skip('parsing bug2', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{definition}
    Let $ U $ be

    (1) there exists

    (2) for all

    In this case.
    \\end{definition}
  `);

  console.log(markdown);
});

test('parsing bug3', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{lemma}
    If $ f: U $ then
    \\begin{itemize}
    \\item (Additivity) Alpha
    \\item (Product Rule) Bravo
    \\item (Quotient Rule) Charlie
    \\end{itemize}
    \\end{lemma}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::lemma
    If $f: U$ then

    - (Additivity) Alpha

    - (Product Rule) Bravo

    - (Quotient Rule) Charlie
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div id="lemma-1" class="boxout lemma">
      <p><span class="type">Lemma <span class="count">1.</span></span> If <code class="latex">f: U</code> then</p>
      <ul>
        <li>
          <p>(Additivity) Alpha</p>
        </li>
        <li>
          <p>(Product Rule) Bravo</p>
        </li>
        <li>
          <p>(Quotient Rule) Charlie</p>
        </li>
      </ul>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
