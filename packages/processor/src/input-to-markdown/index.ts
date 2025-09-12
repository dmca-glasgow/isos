import { Root as LatexAstRoot } from '@unified-latex/unified-latex-types';
import { unifiedLatexFromString } from '@unified-latex/unified-latex-util-parse';
import { Root as HastRoot } from 'hast';
import { Root as MDastRoot } from 'mdast';
// import formatHtml from 'pretty';
import rehypeRemark from 'rehype-remark';
// import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';

import { createRemarkProcessor } from '../remark-processor';
import { Options } from './options';

export async function inputToMarkdown(input: string, options: Options) {
  // console.log(input);
  const mdAst = await getMdAst(input, options);
  // console.dir(mdAst, { depth: null });
  const processor = createRemarkProcessor(options.input.mdAstTransforms);
  const transformed = await processor.run(mdAst);
  // console.dir(transformed, { depth: null });
  const markdown = processor.stringify(transformed as MDastRoot);
  // console.log(markdown);
  const stringTransformed = markdownStringTransforms(
    markdown,
    options.markdownStringTransforms,
  ).trim();
  // console.log(stringTransformed);
  return stringTransformed;
}

function getMdAst(input: string, options: Options) {
  switch (options.type) {
    case 'markdown':
      return markdownToMdAstProcessor(
        input,
        options.input.markdownStringTransforms,
      );
    case 'latex':
      return latexToMdAstProcessor(input, options.latexToMdAst);
    default:
      throw new Error(`file type: "${options.type}" is not supported`);
  }
}

async function markdownToMdAstProcessor(
  input: string,
  transforms: Options['input']['markdownStringTransforms'],
) {
  // console.log(input);
  const markdown = markdownStringTransforms(input, transforms);
  // console.log(markdown);
  return createRemarkProcessor().parse(markdown);
}

export async function latexToMdAstProcessor(
  input: string,
  options: Options['latexToMdAst'],
) {
  const parsed = unified()
    .use(
      // @ts-expect-error
      unifiedLatexFromString,
      options.latexAstFromStringOptions,
    )
    .parse(input);

  // console.dir(parsed, { depth: null });

  const latexAst = await unified()
    .use(options.latexAstTransforms)
    .run(parsed as LatexAstRoot);

  // console.dir(latexAst, { depth: null });

  const htmlAst = await unified()
    .use(unifiedLatexToHast, options.latexAstToHtmlAstOptions())
    .run(latexAst as LatexAstRoot);

  // console.dir(htmlAst, { depth: null });

  const htmlAstTransformed = await unified()
    .use(options.htmlAstTransforms)
    .run(htmlAst as HastRoot);

  // console.dir(htmlAstTransformed, { depth: null });

  // const html = unified()
  //   .use(rehypeStringify)
  //   .stringify(htmlAstTransformed as HastRoot);
  // console.log(formatHtml(html));

  const mdAst = await createRemarkProcessor([
    [rehypeRemark, options.htmlAstToMdAstOptions()],
    ...options.mdAstTransforms,
  ]).run(htmlAstTransformed as HastRoot);

  // console.dir(mdAst, { depth: null });

  return mdAst as MDastRoot;
}

function markdownStringTransforms(
  markdown: string,
  transforms: Options['markdownStringTransforms'],
) {
  return transforms.reduce((acc, fn) => fn(acc), markdown);
}
