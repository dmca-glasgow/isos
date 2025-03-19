import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { writeFile } from 'fs/promises';

import { inputToMarkdown } from '../latex-to-markdown';
import { createContext } from '../latex-to-markdown/context';
// import { expect, test } from '@playwright/test';
// import { readFile } from 'fs/promises';

import { createE2eTestBundle } from '../test-utils/create-e2e-test-bundle';

test.skip('axe', async ({ page }) => {
  test.slow();

  const ctx = await createContext(
    '/Users/staff/Work/latex-experiments/test1/MCA_lecturenotes.tex',
  );

  const markdown = await inputToMarkdown(ctx);

  const html = await createE2eTestBundle(markdown);

  await writeFile('./TESTY.html', html);

  await page.setContent(html);

  const scan = await new AxeBuilder({ page }).analyze();

  console.dir(scan.violations, { depth: null });

  expect(scan.violations.length).toBe(0);
});
