import { readTextFile } from '@tauri-apps/api/fs';

import { Theorems } from '../shared-utils/theorem';
import { FancyTitle } from './latexast-transforms/extract-fancytitle';
import { FileType, parseFilePath } from './utils/parse-file-path';

export type Context = {
  filePath: string;
  type: FileType;
  content: string;
  frontmatter: {
    theorems: Theorems;
  };
  fancyTitle: FancyTitle;
};

export async function createContext(filePath: string): Promise<Context> {
  const { type } = parseFilePath(filePath);
  const content = await readTextFile(filePath);
  return {
    filePath,
    type,
    content,
    frontmatter: {
      theorems: {},
    },
    fancyTitle: {
      content: '',
      part: '',
    },
  };
}

export function createTestContext(
  type: FileType,
  content: string
): Context {
  return {
    filePath: 'test',
    type,
    content,
    frontmatter: {
      theorems: {},
    },
    fancyTitle: {
      content: '',
      part: '',
    },
  };
}
