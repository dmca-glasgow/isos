import { parseLatexToMdast } from './1-parse-latex-to-mdast';
import { transformMdast } from './2-transform-mdast';
import { FileType } from './utils/parse-file-path';
import {
  parseMarkdownToMdast,
  serialiseMdastToMarkdown,
} from './utils/remark';

export { markdownToJs, runOptions } from './3-markdown-to-js';

export {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
  FileType,
  parseFilePath,
} from './utils/parse-file-path';

export async function inputToMarkdown(type: FileType, content: string) {
  const { mdast } = await getMdast(type, content);
  const { precompiled } = await transformMdast(mdast);
  // console.dir(precompiled, { depth: null });
  const { markdown } = serialiseMdastToMarkdown(precompiled);
  return markdown.trim();
}

function getMdast(type: FileType, content: string) {
  switch (type) {
    case FileType.latex:
      return parseLatexToMdast(content);
    default:
      return parseMarkdownToMdast(content);
  }
}
