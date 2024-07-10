import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// import { expect, test } from '@playwright/test';
// import { readFile } from 'fs/promises';
import { createE2eTestBundle } from '../test-utils/create-e2e-test-bundle';

test.skip('axe', async ({ page }) => {
  const html = await createE2eTestBundle(`
    ::::task
    Test task

    :::answer
    Test answer
    :::
    ::::
  `);

  await page.setContent(html);

  const scan = await new AxeBuilder({ page }).analyze();

  console.dir(scan.violations, { depth: null });

  expect(scan.violations.length).toBe(0);
});
