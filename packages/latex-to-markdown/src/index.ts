import { readTextFile } from '@tauri-apps/api/fs';

import { processLatex } from './process-latex';

export async function latexToMarkdown(filePath: string) {
  const fileContents = await readTextFile(filePath);
  const markdown = await processLatex(fileContents);
  return markdown;
}
