import Prism from 'prismjs';

export function toLaTeX(expr: string) {
  const formatted = formatLaTeX(expr);
  return Prism.highlight(formatted, Prism.languages.latex, 'latex');
}

function formatLaTeX(expr: string) {
  return expr
    .replace(/\\\\\s?/g, '\\\\\n')
    .replace(/\\begin{align(\*?)}/g, '\\begin{align$1}\n')
    .replace(/\\end{align(\*?)}/g, '\n\\end{align$1}');
}
