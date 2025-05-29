import { readTextFile } from '@isos/fs';

import { RefObjectsYaml } from '../plugins/refs-and-counts/default-objects';
// import { FancyTitle } from './latexast-transforms/extract-fancytitle';
import { FileType, parseFilePath } from './utils/parse-file-path';

export type Context = {
  filePath: string;
  subFilePaths: string[];
  base64Images: Record<string, string>;
  type: FileType;
  content: string;
  frontmatter: {
    theorems: RefObjectsYaml;
    'reference-location': string;
  };
  // fancyTitle: FancyTitle;
};

export async function createContext(filePath: string): Promise<Context> {
  const { type } = parseFilePath(filePath);
  const content = await readTextFile(filePath);
  return {
    filePath,
    subFilePaths: [],
    base64Images: {},
    type,
    content,
    frontmatter: {
      theorems: {},
      'reference-location': 'margin',
    },
    // fancyTitle: {
    //   content: '',
    //   part: '',
    // },
  };
}

export function createTestContext(
  type: FileType,
  content: string,
): Context {
  return {
    filePath: 'test',
    subFilePaths: [],
    base64Images: {},
    type,
    content,
    frontmatter: {
      theorems: {},
      'reference-location': 'margin',
    },
    // fancyTitle: {
    //   content: '',
    //   part: '',
    // },
  };
}
