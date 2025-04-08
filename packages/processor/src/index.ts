export {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
  parseFilePath,
} from './latex-to-markdown/utils/parse-file-path';

export type { FileType } from './latex-to-markdown/utils/parse-file-path';

export { inputToMarkdown } from './latex-to-markdown';
export { createDefaultOptions as createInputToMarkdownOptions } from './latex-to-markdown/options';
export { createContext as createInputToMarkdownContext } from './latex-to-markdown/context';

export { markdownToArticle, markdownToTOC } from './markdown-to-mdx';
export { createDefaultOptions as createMarkdownToMdxOptions } from './markdown-to-mdx/options';
export { createContext as createMarkdownToMdxContext } from './markdown-to-mdx/context';
export { createMdxState } from './markdown-to-mdx/mdx-handlers/mdx-state';
export { RenderMDX } from './markdown-to-mdx/render-mdx';

export type {
  MathsFont,
  MathsOptions,
} from './markdown-to-mdx/mdx-handlers/maths/Maths';
