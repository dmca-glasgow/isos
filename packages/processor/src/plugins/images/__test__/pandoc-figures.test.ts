import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('image', async () => {
  const markdown = unindentStringAndTrim(`
    ![](image.png)
  `);
  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <p><img src="image.png" /></p>
  // `);
  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><img src="image.png" alt="Image" /></p>
  `);
  expect(html).toBe(expectedHtml);
});

test('image with alt text', async () => {
  const markdown = unindentStringAndTrim(`
    ![](image.png){alt="alt text" bla="hey"}
  `);
  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <p><img src="image.png" alt="alt text" data-bla="hey" /></p>
  // `);
  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><img src="image.png" alt="alt text" data-bla="hey" /></p>
  `);
  expect(html).toBe(expectedHtml);
});

test('image with title text', async () => {
  const markdown = unindentStringAndTrim(`
    ![](image.png "title text")
  `);
  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <p><img src="image.png" title="title text" /></p>
  // `);
  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><img src="image.png" alt="Image" title="title text" /></p>
  `);
  expect(html).toBe(expectedHtml);
});

test('image with formatted caption text', async () => {
  const markdown = unindentStringAndTrim(`
    ![**caption** text](image.png)
  `);
  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <figure>
  //   <img src="image.png" alt="caption text" />
  //   <figcaption aria-hidden="true"><strong>caption</strong>
  //   text</figcaption>
  //   </figure>
  // `);
  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <figure><img src="image.png" alt="Image" />
      <figcaption><strong>Figure 1:</strong> <strong>caption</strong> text</figcaption>
    </figure>
  `);
  expect(html).toBe(expectedHtml);
});

test('image with formatted caption and alt text', async () => {
  const markdown = unindentStringAndTrim(`
    ![**caption** text](image.png){alt="alt text"}
  `);
  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <figure>
  //   <img src="image.png" alt="alt text" />
  //   <figcaption><strong>caption</strong> text</figcaption>
  //   </figure>
  // `);
  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <figure><img src="image.png" alt="alt text" />
      <figcaption><strong>Figure 1:</strong> <strong>caption</strong> text</figcaption>
    </figure>
  `);
  expect(html).toBe(expectedHtml);
});

test('image with alt, title and caption text', async () => {
  const markdown = unindentStringAndTrim(`
    ![caption *text*](image.png "title text"){alt="alt text"}
  `);
  const pandocHtml = await markdownToPandocHtml(markdown);
  // console.log(pandocHtml);

  const expectedPandocHtml = unindentStringAndTrim(`
    <figure>
    <img src="image.png" title="title text" alt="alt text" />
    <figcaption>caption <em>text</em></figcaption>
    </figure>
  `);
  expect(pandocHtml).toBe(expectedPandocHtml);
});
