import { expect, test } from 'vitest';

import { testProcessor, unindentStringAndTrim } from '@isos/test-utils';

test.skip('parsing bug 2', async () => {
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
