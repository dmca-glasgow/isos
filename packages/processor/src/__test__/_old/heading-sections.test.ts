import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../../test-utils/unindent-string';
import { testProcessor } from '../../test-utils/unit-test-processor';

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
