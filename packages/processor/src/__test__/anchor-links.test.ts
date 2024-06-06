import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../utils/unindent-string';
import { testProcessor } from '../utils/unit-test-processor';

test('environment anchor links', async () => {
  const latex = `
    \\begin{definition} \\label{CMD1.1}
    Let $ \\epsilon > 0 $ be a subset.
    \\end{definition}

    Definition~\\ref{CMD1.1} is automatically satisfied.
  `;

  const markdown = `
    :::definition{id="CMD1.1"}
    Let $\\epsilon > 0$ be a subset.
    :::

    Definition [CMD1.1](#CMD1.1) is automatically satisfied.
  `;

  const html = await testProcessor.both(latex, markdown);

  const expected = unindentStringAndTrim(`
    <div class="boxout definition" id="CMD1.1"><span class="type">Definition 1</span>
      <p>Let $\\epsilon > 0$ be a subset.</p>
    </div>
    <p>Definition <a href="#CMD1.1">CMD1.1</a> is automatically satisfied.</p>
  `);

  expect(html).toBe(expected);
});

test.only('heading anchor links', async () => {
  const latex = `\\section{Hello} \\label{hi}`;
  const markdown = `### Hello {#hi}`;
  const html = await testProcessor.both(latex, markdown);
  expect(html).toBe(`<h3 id="hi">Hello</h3>`);
});
