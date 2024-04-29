import { processLatex } from '../process-latex';
import { unindentString } from '../utils/unindent-string';

test('latex to markdown with sidenotes', async () => {
  const md = await processLatex(`
    Some \\textbf{bold} text.

    \\begin{framed}
    My content \\sidenote{and \\textbf{sidenote}}.
    \\end{framed}
  `);

  const expected = unindentString(`
    Some **bold** text.

    My content :sidenote[and **sidenote**].
  `);

  expect(md).toBe(expected);
});

test('latex to markdown with documentclass', async () => {
  const md = await processLatex(`
    \\documentclass{tufte-handout}
    \\begin{document}

    Some \\textbf{bold} text.

    \\begin{framed}
    My content \\sidenote{and \\textbf{sidenote}}.
    \\end{framed}

    \\end{document}
  `);

  const expected = unindentString(`
    Some **bold** text.

    My content :sidenote[and **sidenote**].
  `);

  expect(md).toBe(expected);
});

test('latex to markdown with maths', async () => {
  const md = await processLatex(`
    \\documentclass{article}

    \\begin{document}

    Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
    equation.

    $$
    L = \\frac{1}{2} \\rho v^2 S C_L
    $$

    \\end{document}
  `);

  const expected = unindentString(`
    Lift($L$) can be determined by Lift Coefficient ($C_{L}$) like the following equation.

    $$
    L = \\frac{1}{2}\\rho v^{2} S C_{L}
    $$
  `);

  expect(md).toBe(expected);
});

test('latex to markdown with maths and renewcommand', async () => {
  const md = await processLatex(`
    \\documentclass{article}

    \\renewcommand{\\Im}{\\mathop{\\textup{Im}}}

    \\begin{document}

    And $ \\Im(z) $, respectively.

    \\end{document}
  `);

  const expected = unindentString(`
    And $\\mathop{\\textup{Im}}(z)$, respectively.
  `);

  expect(md).toBe(expected);
});
