import { expect, test } from 'vitest';

import { testProcessor, unindentStringAndTrim } from '@isos/test-utils';

// @ts-ignore
// import { pdfLatexFixtureToHtml } from '../../../test-utils/pdflatex-to-html';

test.skip('course', async () => {
  const markdown = await testProcessor.fixture('course/index.tex');
  console.log(markdown);
  // return;
  const html = await testProcessor.md(markdown);
  console.log(html);
});

test('account for colons in text', async () => {
  const markdown = await testProcessor.latex(String.raw`
    Note that $ \arg(z) $ has infinitely many values: if $ \theta $.
  `);
  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(String.raw`
    <p>Note that <code class="latex">\arg(z)</code> has infinitely many values: if <code class="latex">\theta</code>.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test('account for ligatures in theorem names', async () => {
  const markdown = await testProcessor.latex(String.raw`
    l'H\^opital's rule.

    \begin{proposition}[l'H\^opital's rule]
    If
    \end{proposition}
  `);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    l’Hôpital’s rule.

    ::: {#prp-1 name="l’Hôpital’s rule"}
    If
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p>l’Hôpital’s rule.</p>
    <div class="definition proposition" id="prp-1">
      <p><span class="title"><strong>Proposition 1 (l’Hôpital’s rule).</strong></span> If</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
