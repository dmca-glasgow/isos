import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',

  testMatch: '**/*.e2e.ts',

  expect: {
    toHaveScreenshot: {
      pathTemplate: './e2e-screenshots/{testFilePath}/{arg}{ext}',
    },
    toMatchAriaSnapshot: {
      pathTemplate: './e2e-snapshots/{testFilePath}/{arg}{ext}',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
      },
      testIgnore: ['**/_old/**'],
    },
  ],
});
