import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('markdown with embedded html', async () => {
  const markdown = unindentStringAndTrim(`
    Hello

    <hr>
  `);

  // const quartoHtml = await markdownToQuartoHtml(markdown);

  // const expectedQuartoHtml = unindentStringAndTrim(`
  //   <p>Hello</p>
  //   <hr>
  // `);

  // expect(quartoHtml).toBe(expectedQuartoHtml);

  // console.log(quartoHtml);

  // expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p>Hello</p>
    <pre class="raw-html"><code class="language-html">&lt;hr></code></pre>
  `);

  expect(html).toBe(expectedHtml);
});
