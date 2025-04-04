import { Root as LatexAstRoot } from '@unified-latex/unified-latex-types';
import { unifiedLatexFromString } from '@unified-latex/unified-latex-util-parse';
import { Root as HastRoot } from 'hast';
import { Root as MDastRoot } from 'mdast';
import rehypeRemark from 'rehype-remark';
import { unified } from 'unified';

import { unifiedLatexToHast } from '@isos/unified-latex-to-hast';

import { createRemarkProcessor } from '../shared-utils/remark-pipeline';
import { Options } from './options';

export async function inputToMarkdown(input: string, options: Options) {
  const mdAst = await getMdAst(input, options);
  const processor = createRemarkProcessor(options.input.mdAstTransforms);
  const transformed = await processor.run(mdAst);
  return processor.stringify(transformed as MDastRoot).trim();
}

function getMdAst(input: string, options: Options) {
  switch (options.type) {
    case 'markdown':
      return createRemarkProcessor().parse(input);
    case 'latex':
      return latexToMdAstProcessor(input, options.latexToMdAst);
    default:
      throw new Error(`file type : "${options.type}" is not supported`);
  }
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

  const latexAst = await unified()
    .use(options.latexAstTransforms)
    .run(parsed);

  const htmlAst = await unified()
    .use(unifiedLatexToHast, options.latexAstToHtmlAstOptions)
    .use(options.htmlAstTransforms)
    .run(latexAst as LatexAstRoot);

  const mdAst = await createRemarkProcessor([
    [rehypeRemark, options.htmlAstToMdAstOptions],
    ...options.mdAstTransforms,
  ]).run(htmlAst as HastRoot);

  // console.dir(parsed, { depth: null });
  // console.dir(latexAst, { depth: null });
  // console.dir(htmlAst, { depth: null });
  // console.dir(mdAst, { depth: null });

  return mdAst;
}
