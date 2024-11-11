import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('maths 2 fancytitle', async () => {
  const markdown = await testProcessor.latex(`
    \\documentclass{UoG-lecture}

    \\title{Matrix Algebra}
    \\session{\\,}
    \\exsheetnumber{2}

    \\begin{document}

    \\fancytitle

    \\end{document}
  `);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::fancytitle[Matrix Algebra]{part="2"}
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(markdown);

  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <h1>Matrix Algebra <span class="part"><span class="label">Part</span> <span class="number">2</span></span></h1>
  `);

  expect(html).toBe(expectedHtml);
});
