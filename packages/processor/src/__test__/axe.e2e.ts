import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { writeFile } from 'fs/promises';

import { inputToMarkdown } from '../latex-to-markdown';
import { createContext } from '../latex-to-markdown/context';
import { createDefaultOptions } from '../latex-to-markdown/options';
// import { expect, test } from '@playwright/test';
// import { readFile } from 'fs/promises';

import { createE2eTestBundle } from '../test-utils/create-e2e-test-bundle';

test.skip('axe', async ({ page }) => {
  test.slow(); // approx. 45 seconds

  const ctx = await createContext(
    '/Users/staff/Work/latex-experiments/test1/MCA_lecturenotes.tex',
  );

  const options = createDefaultOptions(ctx);
  const markdown = await inputToMarkdown(ctx.content, options);

  const html = await createE2eTestBundle(markdown);

  await writeFile('./TEST.html', html);

  await page.setContent(html);

  const scan = await new AxeBuilder({ page }).analyze();

  console.dir(scan.violations, { depth: null });

  expect(scan.violations.length).toBe(0);
});

test('screenshot pdf', async ({ page }) => {
  await page.setViewportSize({
    width: 1100,
    height: 1185,
  });

  await page.goto('./packages/processor/fixtures/images/article.pdf');

  await page.waitForTimeout(1000);

  const top = 80;
  const left = 96;
  const width = 108;
  const height = 152;
  const spacing = 49;

  function getThumbnailY(n: number) {
    return top + (height + spacing) * (n - 1) + 10;
  }

  await page.mouse.click(left + width / 2, getThumbnailY(6));

  await expect(page).toHaveScreenshot('testy-test.png', {
    clip: {
      x: 305 / 2, // not sure why I need to divide by 2 here
      y: 59 / 2, // maybe devicePixelRatio?
      width: 790,
      height: 1118,
    },
  });
});
