import { expect, test } from '@playwright/test';

import { createE2eTestBundle } from '@isos/test-utils/e2e';

// cli: pnpm run e2e export --ui

test('hello world', async ({ page }) => {
  const html = await createE2eTestBundle(`
    Hello World!
  `);

  await page.setContent(html);

  await expect(
    page.locator('article').filter({ hasText: /Hello World!/ }),
  ).toBeVisible();
});
