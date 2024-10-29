import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{example}
    If $ n $~is a natural number, then
    $$
    \\dfrac{d}{dz}z^n = nz^{n-1}.
    $$
    and bla bla bla.
    \\end{example}

    If $ n $~is a natural number, then
    $$
    \\dfrac{d}{dz}z^n = nz^{n-1}.
    $$
    and bla bla bla.
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::example
    If $n$ is a natural number, then

    $$
    \\dfrac{d}{dz}z^{n} = nz^{n-1}.
    $$

    and bla bla bla.
    :::

    If $n$ is a natural number, then

    $$
    \\dfrac{d}{dz}z^{n} = nz^{n-1}.
    $$

    and bla bla bla.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  const expectedHtml = unindentStringAndTrim(`
    <div id="example-1" class="boxout example">
      <p><span class="type">Example <span class="count">1.</span></span> If <code class="language-math math-inline">n</code> is a natural number, then</p><pre><code class="language-math math-display">\\dfrac{d}{dz}z^{n} = nz^{n-1}.</code></pre>
      <p>and bla bla bla.</p>
    </div>
    <p>If <code class="language-math math-inline">n</code> is a natural number, then</p>
    <pre><code class="language-math math-display">\\dfrac{d}{dz}z^{n} = nz^{n-1}.</code></pre>
    <p>and bla bla bla.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test('parsing bug2', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{example}
    If $ n $~is a natural number, then
    \\begin{align*}
    \\dfrac{d}{dz}z^n = nz^{n-1}.
    \\end{align*}
    and bla bla bla.
    \\end{example}

    If $ n $~is a natural number, then
    \\begin{align*}
    \\dfrac{d}{dz}z^n = nz^{n-1}.
    \\end{align*}
    and bla bla bla.
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    :::example
    If $n$ is a natural number, then

    $$
    \\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}
    $$

    and bla bla bla.
    :::

    If $n$ is a natural number, then

    $$
    \\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}
    $$

    and bla bla bla.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div id="example-1" class="boxout example">
      <p><span class="type">Example <span class="count">1.</span></span> If <code class="language-math math-inline">n</code> is a natural number, then</p><pre><code class="language-math math-display">\\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}</code></pre>
      <p>and bla bla bla.</p>
    </div>
    <p>If <code class="language-math math-inline">n</code> is a natural number, then</p>
    <pre><code class="language-math math-display">\\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}</code></pre>
    <p>and bla bla bla.</p>
  `);

  expect(html).toBe(expectedHtml);
});

test('parsing bug3', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{solution}
    We treat the equation
    $$
    \\tfrac{1}{2}(e^{iz} + e^{-iz}) = 10
    $$
    as a quadratic equation in~$ e^{iz} $. After rearrangement it becomes
    $$
    (e^{iz})^2-20 e^{iz} + 1 = 0.
    $$
    The solutions are
    $$
    e^{iz} = \\dfrac{20\\pm\\sqrt{396}}{2} = 10\\pm\\sqrt{99},
    $$
    so that
    $$
    iz = \\log(10\\pm\\sqrt{99}) + 2k\\pi i,
    $$
    that is,
    $$
    z = -i\\log(10\\pm\\sqrt{99}) + 2k\\pi,
    $$
    where $ k $~is an arbitrary integer.
    \\end{solution}
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    :::solution
    We treat the equation

    $$
    \\tfrac{1}{2}(e^{iz}+ e^{-iz}) = 10
    $$

    as a quadratic equation in $e^{iz}$. After rearrangement it becomes

    $$
    (e^{iz})^{2}-20 e^{iz}+ 1 = 0.
    $$

    The solutions are

    $$
    e^{iz}= \\dfrac{20\\pm\\sqrt{396}}{2}= 10\\pm\\sqrt{99},
    $$

    so that

    $$
    iz = \\log(10\\pm\\sqrt{99}) + 2k\\pi i,
    $$

    that is,

    $$
    z = -i\\log(10\\pm\\sqrt{99}) + 2k\\pi,
    $$

    where $k$ is an arbitrary integer.
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div id="solution-1" class="boxout solution">
      <p><span class="type">Solution.</span> We treat the equation</p><pre><code class="language-math math-display">\\tfrac{1}{2}(e^{iz}+ e^{-iz}) = 10</code></pre>
      <p>as a quadratic equation in <code class="language-math math-inline">e^{iz}</code>. After rearrangement it becomes</p><pre><code class="language-math math-display">(e^{iz})^{2}-20 e^{iz}+ 1 = 0.</code></pre>
      <p>The solutions are</p><pre><code class="language-math math-display">e^{iz}= \\dfrac{20\\pm\\sqrt{396}}{2}= 10\\pm\\sqrt{99},</code></pre>
      <p>so that</p><pre><code class="language-math math-display">iz = \\log(10\\pm\\sqrt{99}) + 2k\\pi i,</code></pre>
      <p>that is,</p><pre><code class="language-math math-display">z = -i\\log(10\\pm\\sqrt{99}) + 2k\\pi,</code></pre>
      <p>where <code class="language-math math-inline">k</code> is an arbitrary integer.<span class="proof-box">◻</span></p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('parsing bug4', async () => {
  const markdown = await testProcessor.latex(`
    \\begin{framed}
    The $A$.
    \\end{framed}
  `);

  const expectedMarkdown = unindentStringAndTrim(`
    :::framed
    The $A$.
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="framed">
      <p>The <code class="language-math math-inline">A</code>.</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
