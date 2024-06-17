import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('parsing bug', async () => {
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
