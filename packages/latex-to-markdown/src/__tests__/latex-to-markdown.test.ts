import { processLatex } from '../process-latex';
import { unindentString } from '../utils/unindent-string';

test('latex to markdown with sidenotes', async () => {
  const { markdown } = await processLatex(`
    Some \\textbf{bold} text.

    \\begin{framed}
    My content \\sidenote{and \\textbf{sidenote}}.
    \\end{framed}
  `);

  const expected = unindentString(`
    Some **bold** text.

    My content :sidenote[and **sidenote**].
  `);

  expect(markdown).toBe(expected);
});

test('latex to markdown with documentclass', async () => {
  const { markdown } = await processLatex(`
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

  expect(markdown).toBe(expected);
});

test('latex to markdown with maths', async () => {
  const { markdown } = await processLatex(`
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

  expect(markdown).toBe(expected);
});

test('latex to markdown with maths and renewcommand', async () => {
  const { markdown } = await processLatex(`
    \\documentclass{article}

    \\renewcommand{\\Im}{\\mathop{\\textup{Im}}}

    \\begin{document}

    And $ \\Im(z) $, respectively.

    \\end{document}
  `);

  const expected = unindentString(`
    And $\\mathop{\\textup{Im}}(z)$, respectively.
  `);

  expect(markdown).toBe(expected);
});

test('latex to markdown with maths and DeclareMathOperator', async () => {
  const { markdown } = await processLatex(`
    \\documentclass{article}

    \\DeclareMathOperator{\\N}{\\mathbb{N}}

    \\begin{document}

    A sequence of complex numbers is a function $ \\N $.

    \\end{document}
  `);

  const expected = unindentString(`
    A sequence of complex numbers is a function $\\mathbb{N}$.
  `);

  expect(markdown).toBe(expected);
});

test('latex to markdown with tildes', async () => {
  const { markdown } = await processLatex(`
    One says that $ f $~is \\emph{differentiable} at~$ a $, with \\emph{derivative}~$ l $.
  `);

  const expected = unindentString(`
    One says that $f$\\&nbsp;is *differentiable* at\\&nbsp;$a$, with *derivative*\\&nbsp;$l$.
  `);

  expect(markdown).toBe(expected);
});

test.only('latex to markdown Misplaced & error', async () => {
  const { markdown } = await processLatex(`
    Then the difference quotient is

    \\begin{align*}
    \\dfrac{z\\bar z - a\\bar a}{z-a}
    &= \\dfrac{(a + re^{i\\theta})(\\bar{a} + re^{-i\\theta}) - a\\bar{a}}{re^{i\\theta}} \\\\
    &= \\dfrac{are^{-i\\theta} + \\bar{a} re^{i\\theta} + r^2}{re^{i\\theta}} \\\\
    &= ae^{-2i\\theta} + \\bar{a} + re^{-i\\theta}.
    \\end{align*}
  `);

  const expected = unindentString(`
    Then the difference quotient is

    $$
    \\begin{align*}\\dfrac{z\\bar z - a\\bar a}{z-a}&= \\dfrac{(a + re^{i\\theta})(\\bar{a} + re^{-i\\theta}) - a\\bar{a}}{re^{i\\theta}}\\\\&= \\dfrac{are^{-i\\theta} + \\bar{a} re^{i\\theta} + r^2}{re^{i\\theta}}\\\\&= ae^{-2i\\theta}+ \\bar{a}+ re^{-i\\theta}.\\end{align*}
    $$
  `);

  expect(markdown).toBe(expected);
});
