import { describe, expect, it } from 'vitest';

import { testProcessor } from '../utils/unit-test-processor';

describe('browserWindow', () => {
  it('should render a browser window', async () => {
    const html = await testProcessor.md(`
      ::browser[images/my-image.png]{url=https://github.com/bla/bla}
    `);

    expect(html).toContain(
      '<div class="browser-window-address-bar">https://github.com/bla/bla</div>'
    );

    expect(html).toContain('<img src="images/my-image.png"');
  });
});
