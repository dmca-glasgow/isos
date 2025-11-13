import { expect, test } from 'vitest';

import { testProcessor, unindentStringAndTrim } from '@isos/test-utils';

// @ts-ignore
// import { pdfLatexFixtureToHtml } from '../../../test-utils/pdflatex-to-html';

test.only('file transclusion with latex', async () => {
  const markdown = await testProcessor.fixture(
    'transclusion-1/article.tex',
  );
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ## Hello

    Here’s my paragraph in article.tex

    ## Other 1

    A paragraph from other1.tex.

    Another paragraph from other1.tex.

    ## Other 2

    Text from other2.tex.

    Here’s my second paragraph in article.tex

    ![My **caption** text](image.png){alt="My alt text"}
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);
});

test('file transclusion with markdown', async () => {
  const markdown = await testProcessor.fixture(
    'transclusion-2/article.qmd',
  );
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ## Hello

    Here's my paragraph in article.qmd

    ## Other 1

    A paragraph from other1.qmd.

    Another paragraph from other1.qmd.

    ## Other 2

    Text from other2.qmd.

    Here's my second paragraph in article.qmd

    ![My **caption** text](image.png){alt="My alt text"}

    \`\`\`python
    # This program prints Hello, world!

    print('Hello, world!')
    \`\`\`
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const html = await testProcessor.md(markdown, { noSections: false });
  // console.log(html);
});
