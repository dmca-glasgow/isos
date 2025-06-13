export {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
  parseFilePath,
} from './input-to-markdown/utils/parse-file-path';

export type { FileType } from './input-to-markdown/utils/parse-file-path';

export { inputToMarkdown } from './input-to-markdown';
export { createDefaultOptions as createInputToMarkdownOptions } from './input-to-markdown/options';
export {
  createContext as createInputToMarkdownContext,
  createTestContext as createInputToMarkdownTestContext,
} from './input-to-markdown/context';

export { markdownToArticle, markdownToTOC } from './markdown-to-mdx';
export { createDefaultOptions as createMarkdownToMdxOptions } from './markdown-to-mdx/options';
export { createContext as createMarkdownToMdxContext } from './markdown-to-mdx/context';
export { createMdxState } from './markdown-to-mdx/mdx-handlers/mdx-state';
export { RenderMDX } from './markdown-to-mdx/render-mdx';

export type {
  MathsFont,
  MathsOptions,
} from './plugins/maths/mdx-handlers/Maths';

export { embedIncludes } from './embed-includes';
