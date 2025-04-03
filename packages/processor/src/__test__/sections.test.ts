import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test.skip('fancy section heading', async () => {
  const markdown = await testProcessor.latex(`
    \\fancysection{Chapter overview}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ## Chapter overview {.fancy.starred}
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <section id="chapter-overview">
      <h2 class="fancy">Chapter overview</h2>
    </section>
  `);

  expect(html).toBe(expectedHtml);
});

test('framed environment', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{framed}
    \\begin{definition} A \\emph{matrix}.
    \\end{definition}
    \\vspace*{-4mm}
    \\end{framed}
  `);

  // console.log(markdown);ß

  const expectedMarkdown = unindentStringAndTrim(`
    ::::framed
    :::definition
    A *matrix*.
    :::
    ::::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="framed">
      <div id="definition-1" class="boxout definition">
        <p><span class="type">Definition <span class="count">1.</span></span> A <em>matrix</em>.</p>
      </div>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
