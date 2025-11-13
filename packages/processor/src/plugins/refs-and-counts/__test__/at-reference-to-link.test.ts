import { expect, test } from 'vitest';

import { testProcessor, unindentStringAndTrim } from '@isos/test-utils';

// @ts-ignore
// import { markdownToPandocHtml } from '@isos/test-utils/md-to-pandoc-html';
// @ts-ignore
// import { markdownToQuartoHtml } from '@isos/test-utils/md-to-quarto-html';

test('ignore email addresses', async () => {
  const latex = String.raw`
    \documentclass{article}
    \usepackage{hyperref}
    \begin{document}

    Please send comments to \href{mailto:jim.belk@glasgow.ac.uk}{jim.belk@glasgow.ac.uk}.

    \end{document}
  `;

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(String.raw`
    Please send comments to <jim.belk@glasgow.ac.uk>.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Please send comments to <a href="mailto:jim.belk@glasgow.ac.uk" target="_blank">jim.belk@glasgow.ac.uk</a>.</p>
  `);

  expect(html).toBe(expectedHtml);
});
