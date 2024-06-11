import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('environment references', async () => {
  const latex = `
    \\begin{definition} \\label{CMD1.1}
    Let $ \\epsilon > 0 $ be a subset.
    \\end{definition}

    Definition~\\ref{CMD1.1} is automatically satisfied.
  `;
  const markdown = await testProcessor.latex(latex);

  const expectedMarkdown = unindentStringAndTrim(`
    :::definition{id="CMD1.1"}
    Let $\\epsilon > 0$ be a subset.
    :::

    Definition :ref[CMD1.1] is automatically satisfied.
  `);
  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expected = unindentStringAndTrim(`
    <div id="cmd11" class="boxout definition">
      <p><span class="type">Definition <span class="count">1.</span></span> Let $\\epsilon > 0$ be a subset.</p>
    </div>
    <p>Definition <a href="#cmd11" class="ref">1</a> is automatically satisfied.</p>
  `);

  expect(html).toBe(expected);
});

test('heading references', async () => {
  const latex = `
    \\section{Hello} \\label{CMD3.5}

    Definition~\\ref{CMD3.5} is automatically satisfied.
  `;
  const markdown = `
    ## Hello {#CMD3.5}

    Definition :ref[CMD3.5] is automatically satisfied.
  `;

  const html = await testProcessor.both(latex, markdown);

  const expected = unindentStringAndTrim(`
    <h2 id="cmd35"><span class="count">1.</span> Hello</h2>
    <p>Definition <a href="#cmd35" class="ref">1</a> is automatically satisfied.</p>
  `);

  expect(html).toBe(expected);
});