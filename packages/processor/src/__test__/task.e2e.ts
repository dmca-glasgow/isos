// import { createRuntimeHtml } from '@isos/export';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'fs/promises';

test('axe', async ({ page }) => {
  //   const html = await createRuntimeHtml(
  //     `
  // ::::task
  // Test task

  // :::answer
  // Test answer
  // :::
  // ::::
  //   `,
  //     { docTitle: 'Test' }
  //   );

  const contents = await readFile('./cheatsheet.html', 'utf-8');
  await page.setContent(contents);

  const scan = await new AxeBuilder({ page }).analyze();

  console.dir(scan.violations, { depth: null });

  expect(scan.violations.length).toBe(0);
});
