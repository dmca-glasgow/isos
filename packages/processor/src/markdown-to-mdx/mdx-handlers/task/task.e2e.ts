import { expect, test } from '@playwright/test';

import { createE2eTestBundle } from '../../../test-utils/create-e2e-test-bundle';

test('task and answer', async ({ page }) => {
  const html = await createE2eTestBundle(`
    ::::task
    Test task

    :::answer
    Test answer
    :::
    ::::
  `);

  await page.setContent(html);

  await expect(
    page.locator('.answer-reveal').filter({ hasText: /Test answer/ }),
  ).not.toBeVisible();

  await page.getByText('Show answer').click();

  await expect(
    page.locator('.answer-reveal').filter({ hasText: /Test answer/ }),
  ).toBeVisible();
});
