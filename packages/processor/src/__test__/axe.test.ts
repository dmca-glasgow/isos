import AxeBuilder from '@axe-core/playwright';
import { expect, test } from 'vitest';

// import { expect, test } from '@playwright/test';
// import { readFile } from 'fs/promises';
import { createRuntimeHtml } from '@isos/export';

test('axe', async ({ page }) => {
  const html = await createRuntimeHtml(
    `
::::task
Test task

:::answer
Test answer
:::
::::
  `,
    { docTitle: 'Test' }
  );

  // const html = await readFile('./cheatsheet.html', 'utf-8');
  await page.setContent(html);

  const scan = await new AxeBuilder({ page }).analyze();

  console.dir(scan.violations, { depth: null });

  expect(scan.violations.length).toBe(0);
});
