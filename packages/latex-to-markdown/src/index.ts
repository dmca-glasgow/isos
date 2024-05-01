import { processLatex } from './process-latex';

export async function latexToMarkdown(fileContents: string) {
  const { markdown } = await processLatex(fileContents);
  // console.log(markdown);
  return markdown;
}
