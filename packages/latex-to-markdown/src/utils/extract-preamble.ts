export function extractPreamble(fileContents: string) {
  return fileContents.slice(0, fileContents.indexOf('\\begin{document}'));
}
