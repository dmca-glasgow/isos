import { readTextFile } from '@isos/fs';

import { TheoremsYaml } from '../plugins/theorems-proofs/default-theorems';
import { FancyTitle } from './latexast-transforms/extract-fancytitle';
import { FileType, parseFilePath } from './utils/parse-file-path';

export type Context = {
  filePath: string;
  type: FileType;
  content: string;
  frontmatter: {
    theorems: TheoremsYaml;
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
  content: string,
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
