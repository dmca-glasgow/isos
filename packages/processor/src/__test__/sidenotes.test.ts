import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('sidenote parsing bug', async () => {
  const markdown = await testProcessor.latex(`
    Hello \\sidenote{This is a \\textbf{fast paced} course.} you.
  `);

  console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    Hello :sidenote[This is a **fast paced** course.] you.
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  console.log(html);

  // const expectedHtml = unindentStringAndTrim(`
  //   <div id="cmd11" class="boxout definition">
  //     <p><span class="type">Definition <span class="count">1.</span></span> Let.</p>
  //     <ol>
  //       <li>
  //         <p>one</p>
  //       </li>
  //       <li>
  //         <p>two</p>
  //       </li>
  //     </ol>
  //     <p>me.</p>
  //   </div>
  // `);

  // expect(html).toBe(expectedHtml);
});

test.only('sidenote parsing bug 2', async () => {
  const markdown = await testProcessor.latex(`
    a

    \\fancysection{Title}\\sidenote{Maths}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    a

    ## Title {.fancy.starred}:sidenote[Maths]
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <p>a</p>
    <h2 id="title" class="fancy">Title<span class="sidenote"><label tabindex="0" title="Maths" aria-describedby="sidenote-1"><sup>1</sup></label><small id="sidenote-1"><span class="sidenote-parenthesis">(sidenote: </span><sup>1</sup> Maths<span class="sidenote-parenthesis">)</span></small></span></h2>
  `);

  expect(html).toBe(expectedHtml);
});
