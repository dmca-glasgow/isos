// https://mdxjs.com/docs/troubleshooting-mdx/#problems-writing-mdx
export function prepareMarkdown(markdown: string) {
  return markdown.replace(/\{/g, '\\{').replace(/</g, '\\<');
}
