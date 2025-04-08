import { expect, test } from 'vitest';

import { testProcessor } from '../test-utils/unit-test-processor';

test('emph to italics', async () => {
  const markdown = await testProcessor.latex(String.raw`\emph{hi 1.2}`);
  expect(markdown).toBe('*hi 1.2*');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><em>hi 1.2</em></p>');
});

test('textit to italics', async () => {
  const markdown = await testProcessor.latex(String.raw`\textit{hi 1.2}`);
  expect(markdown).toBe('*hi 1.2*');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><em>hi 1.2</em></p>');
});

test('textbf to bold', async () => {
  const markdown = await testProcessor.latex(String.raw`\textbf{hi 1.2}`);
  expect(markdown).toBe('**hi 1.2**');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><strong>hi 1.2</strong></p>');
});

test('textbf emph to strong', async () => {
  const markdown = await testProcessor.latex(
    String.raw`\textbf{\emph{hi 1.2}}`,
  );
  expect(markdown).toBe('***hi 1.2***');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><em><strong>hi 1.2</strong></em></p>');
});

test('emph textbf to strong', async () => {
  const markdown = await testProcessor.latex(
    String.raw`\emph{\textbf{hi 1.2}}`,
  );
  expect(markdown).toBe('***hi 1.2***');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><em><strong>hi 1.2</strong></em></p>');
});

test('emph textbf to strong', async () => {
  const markdown = await testProcessor.latex(
    String.raw`\emph{\textbf{hi 1.2}}`,
  );
  expect(markdown).toBe('***hi 1.2***');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p><em><strong>hi 1.2</strong></em></p>');
});

test('superscript', async () => {
  const markdown = await testProcessor.latex(
    String.raw`hello\textsuperscript{hi 1.2}`,
  );
  expect(markdown).toBe('hello^hi 1.2^');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p>hello<sup>hi 1.2</sup></p>');
});

test('subscript', async () => {
  const markdown = await testProcessor.latex(
    String.raw`hello\textsubscript{hi 1.2}`,
  );
  expect(markdown).toBe('hello~hi 1.2~');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p>hello<sub>hi 1.2</sub></p>');
});

test('strikethrough', async () => {
  const markdown = await testProcessor.latex(
    String.raw`strike \sout{through}`,
  );
  expect(markdown).toBe('strike ~~through~~');
  const html = await testProcessor.md(markdown);
  expect(html).toBe('<p>strike <del>through</del></p>');
});
