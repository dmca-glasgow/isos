export function nbspToSpace(markdown: string) {
  return markdown.replace(/\u00a0/g, ' ');
}
