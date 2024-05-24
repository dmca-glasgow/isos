import {
  compileMarkdownToJs,
  compileMarkdownToSidebarJs,
  runOptions,
  sidebarRunOptions,
} from './3-compile-mdast-to-js';

import { parseLatexToMdast } from './1-parse-latex-to-mdast';
import { transformMdast } from './2-transform-mdast';
import { FileType } from './utils/parse-file-path';
import {
  parseMarkdownToMdast,
  serialiseMdastToMarkdown,
} from './utils/remark';

export {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
  FileType,
  parseFilePath,
} from './utils/parse-file-path';

export async function inputToMarkdown(type: FileType, content: string) {
  const { mdast } = await getMdast(type, content);
  const { precompiled } = await transformMdast(mdast);
  const { markdown } = serialiseMdastToMarkdown(precompiled);
  return markdown;
}

export async function markdownToJs(markdown: string) {
  const jsString = await compileMarkdownToJs(markdown);
  return { jsString, runOptions };
}

export async function markdownToSidebarJs(markdown: string) {
  const jsString = await compileMarkdownToSidebarJs(markdown);
  return { jsString, runOptions: sidebarRunOptions };
}

function getMdast(type: FileType, content: string) {
  switch (type) {
    case FileType.latex:
      return parseLatexToMdast(content);
    default:
      return parseMarkdownToMdast(content);
  }
}
