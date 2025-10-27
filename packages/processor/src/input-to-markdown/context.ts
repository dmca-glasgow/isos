import { readTextFile } from '@isos/fs';

import { RefObjectsYaml } from '../plugins/refs-and-counts/default-objects';
import { FileType, parseFilePath } from './utils/parse-file-path';

type Author = {
  name: string;
  orcid?: string;
  affiliation?: string;
};

export type Context = {
  filePath: string;
  subFilePaths: string[];
  base64Images: Record<string, { error: boolean; data: string }>;
  type: FileType;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    author: Author[];
    abstract: string;
    theorems: RefObjectsYaml;
    'reference-location': string;
  };
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
      title: '',
      date: '',
      author: [],
      abstract: '',
      theorems: {},
      'reference-location': 'margin',
    },
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
      title: '',
      date: '',
      author: [],
      abstract: '',
      theorems: {},
      'reference-location': 'margin',
    },
  };
}
