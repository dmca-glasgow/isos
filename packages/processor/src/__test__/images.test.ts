import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug 2', async () => {
  const markdown = await testProcessor.fixture('images/article.tex');

  const expectedMarkdown = unindentStringAndTrim(`
    ::::framed
    This operation caries the vector.

    :::center
    ![](./figs/Ex2-2-13reflection.png)
    :::

    Observe that
    ::::
  `);

  expect(markdown).toBe(expectedMarkdown);
});
