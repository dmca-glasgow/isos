import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToPandocHtml } from '../../../test-utils/md-to-pandoc-html';
// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('image', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{graphicx}
    \begin{document}
    \includegraphics[]{image.png}
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ![](image.png)
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><img src="image.png" alt="Image" /></p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('image with alt text', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{graphicx}
    \begin{document}
    \includegraphics[alt={My \textbf{alt} text}]{image.png}
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ![](image.png){alt="My alt text"}
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p><img src="image.png" alt="My alt text" /></p>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('image with caption', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{graphicx}
    \begin{document}
    \begin{figure}
      \includegraphics[]{image.png}
      \caption{My \textbf{caption} text}
    \end{figure}
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ![My **caption** text](image.png)
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <figure><img src="image.png" alt="Image" />
      <figcaption><strong>Figure 1:</strong> My <strong>caption</strong> text</figcaption>
    </figure>
  `);

  expect(html).toBe(expectedHtml);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);
});

test('image with alt text and caption', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{graphicx}
    \begin{document}
    \begin{figure}
      \includegraphics[alt={My \textbf{alt} text}]{image.png}
      \caption{My \textbf{caption} text}
    \end{figure}
    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ![My **caption** text](image.png){alt="My alt text"}
  `);

  expect(markdown).toBe(expectedMarkdown);

  const quartoMarkdown = unindentStringAndTrim(`
    ![My **caption** text](image.png){fig-alt="My alt text"}
  `);

  // const quartoHtml = await markdownToQuartoHtml(quartoMarkdown);
  // // console.log(quartoHtml);

  // const expectedQuartoHtml = unindentStringAndTrim(`
  //   <div class="quarto-figure quarto-figure-center">
  //     <figure class="figure">
  //       <p><img src="image.png" class="img-fluid figure-img" alt="My alt text"></p>
  //       <figcaption>My <strong>caption</strong> text</figcaption>
  //     </figure>
  //   </div>
  // `);

  // expect(quartoHtml).toBe(expectedQuartoHtml);

  const markdown2 = await testProcessor.mdToMd(quartoMarkdown);
  // // console.log(markdown2);

  expect(markdown2).toBe(expectedMarkdown);

  // const pandocHtml = await markdownToPandocHtml(markdown);
  // // console.log(pandocHtml);

  // const expectedPandocHtml = unindentStringAndTrim(`
  //   <figure>
  //   <img src="image.png" alt="My alt text" />
  //   <figcaption>My <strong>caption</strong> text</figcaption>
  //   </figure>
  // `);

  // expect(pandocHtml).toBe(expectedPandocHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <figure><img src="image.png" alt="My alt text" />
      <figcaption><strong>Figure 1:</strong> My <strong>caption</strong> text</figcaption>
    </figure>
  `);

  expect(html).toBe(expectedHtml);
});
