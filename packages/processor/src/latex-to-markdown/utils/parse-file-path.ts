export const supportedLaTeXExtensions = ['tex'];
export const supportedMarkdownExtensions = ['md', 'Rmd', 'qmd'];

export type FileType = 'latex' | 'markdown';

export function parseFilePath(filePath: string) {
  return {
    name: getFileName(filePath),
    type: getFileType(filePath),
  };
}

function getFileName(filePath: string) {
  return filePath.slice(0, filePath.lastIndexOf('.'));
}

function getFileType(filePath: string): FileType {
  const ext = filePath.slice(filePath.lastIndexOf('.') + 1);

  if (supportedLaTeXExtensions.includes(ext)) {
    return 'latex';
  }
  if (supportedMarkdownExtensions.includes(ext)) {
    return 'markdown';
  }

  throw new Error(`unsupported file extension: ${ext}`);
}
