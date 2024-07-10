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
      <p><span class="type">Example <span class="count">1.</span></span> If $n$ is a natural number, then</p>$$\\dfrac{d}{dz}z^{n} = nz^{n-1}.$$<p>and bla bla bla.</p>
    </div>
    <p>If $n$ is a natural number, then</p>
    $$\\dfrac{d}{dz}z^{n} = nz^{n-1}.$$
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
      <p><span class="type">Example <span class="count">1.</span></span> If $n$ is a natural number, then</p>$$\\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}$$<p>and bla bla bla.</p>
    </div>
    <p>If $n$ is a natural number, then</p>
    $$\\begin{align*}\\dfrac{d}{dz}z^{n} = nz^{n-1}.\\end{align*}$$
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
      <p><span class="type">Solution.</span> We treat the equation</p>$$\\tfrac{1}{2}(e^{iz}+ e^{-iz}) = 10$$<p>as a quadratic equation in $e^{iz}$. After rearrangement it becomes</p>$$(e^{iz})^{2}-20 e^{iz}+ 1 = 0.$$<p>The solutions are</p>$$e^{iz}= \\dfrac{20\\pm\\sqrt{396}}{2}= 10\\pm\\sqrt{99},$$<p>so that</p>$$iz = \\log(10\\pm\\sqrt{99}) + 2k\\pi i,$$<p>that is,</p>$$z = -i\\log(10\\pm\\sqrt{99}) + 2k\\pi,$$<p>where $k$ is an arbitrary integer.<span class="proof-box">◻</span></p>
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
      <p>The $A$.</p>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
