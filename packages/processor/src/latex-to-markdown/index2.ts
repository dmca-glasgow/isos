// import { RunOptions } from '@mdx-js/mdx';
// import { PluginOptions as LatexConvertOptions } from '@unified-latex/unified-latex-to-hast';
// import { PluginOptions as LatexParseOptions } from '@unified-latex/unified-latex-util-parse';
// import { Options as HtmlConvertOptions } from 'rehype-remark';
// import { PluggableList } from 'unified';

// const input = String.raw`
//   \section{hello}
// `;

// const options = createDefaultOptions();
// const markdown = inputToMarkdown(input, options);

// const options2 = createDefaultOptions2();
// const mdx = markdownToArticle(markdown, options2);

// console.log(mdx);

// type Options = {
//   filePath: string;
//   type: 'latex' | 'markdown';
//   frontmatter?: {};
//   noInlineImages: boolean;
//   input?: {
//     latexStringTransforms?: Array<(latex: string) => string>;
//     markdownStringTransforms?: Array<(latex: string) => string>;
//     mdAstTransforms?: PluggableList;
//   };
//   latexToMdAst?: {
//     latexAstFromStringOptions?: LatexParseOptions;
//     latexAstTransforms?: PluggableList;
//     latexAstToHtmlAstOptions?: LatexConvertOptions;
//     htmlAstTransforms?: PluggableList;
//     htmlAstToMdAstOptions?: HtmlConvertOptions;
//     mdAstTransforms?: PluggableList;
//   };
// };

// const ctx = createContext();

// function createDefaultOptions(ctx): Options {
//   return {
//     filePath: './',
//     type: 'latex',
//     noInlineImages: false,
//     input: {
//       latexStringTransforms: [(str) => `${str}2`, (str) => `${str}.jpg`],
//       markdownStringTransforms: [
//         (str) => `${str}2`,
//         (str) => `${str}.jpg`,
//       ],
//       mdAstTransforms: [],
//     },
//     latexToMdAst: {
//       latexAstFromStringOptions: {
//         // macros: {}
//       },
//       latexAstTransforms: [],
//       latexAstToHtmlAstOptions: {
//         // macroReplacements: {}
//       },
//       htmlAstTransforms: [],
//       htmlAstToMdAstOptions: {
//         // handlers: {}
//       },
//       mdAstTransforms: [],
//     },
//   };
// }

// function inputToMarkdown(input: string, options: Options) {
//   return '';
// }

// type Options2 = {
//   noWrapper?: boolean;
//   noSections?: boolean;
//   markdownStringTransforms?: Array<(latex: string) => string>;
//   mdAstTransforms?: PluggableList;
//   htmlAstTransforms?: PluggableList;
//   mdxRunOptions?: RunOptions;
// };

// function createDefaultOptions2(): Options2 {
//   return {
//     noWrapper: false,
//     noSections: false,
//     markdownStringTransforms: [(str) => `${str}2`, (str) => `${str}.jpg`],
//     mdAstTransforms: [],
//     htmlAstTransforms: [],
//     // mdxRunOptions: {}
//   };
// }

// function markdownToArticle(markdown: string, options: Options2) {}
