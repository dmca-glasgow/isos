export function latexArticleWrapper(preamble: string, content: string) {
  return `
${preamble}

\\begin{document}

${content}

\\end{document}
  `;
}
