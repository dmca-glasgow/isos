import { createProcessor, run } from '@mdx-js/mdx';
import { Root } from 'mdast';

import { createRemarkProcessor } from '../remark-processor';
import { processorOptions } from './hast-transforms';
import { Options } from './options';
import { createTableOfContents } from './sidebar';

export async function markdownToArticle(md: string, options: Options) {
  const mdAst = await getMdAst(md, options);
  // console.dir(mdAst, { depth: null });

  const mdxProcessor = createProcessor({
    ...processorOptions,
    rehypePlugins: options.htmlAstTransforms,
  });

  // @ts-expect-error: mdAst is not of type Program
  const esAst = await mdxProcessor.run(mdAst);
  const mdxString = mdxProcessor.stringify(esAst);
  return run(mdxString, options.mdxArticleRunOptions);
}

export async function markdownToTOC(md: string, options: Options) {
  const mdAst = await getMdAst(md, options);
  // console.dir(mdAst, { depth: null });

  const toc = await createTableOfContents(mdAst as Root);
  // console.dir(toc, { depth: null });

  const mdxProcessor = createProcessor(processorOptions);

  // @ts-expect-error: toc is not of type Program
  const esAst = await mdxProcessor.run(toc);
  const mdxString = mdxProcessor.stringify(esAst);
  return run(mdxString, options.mdxTOCRunOptions);
}

async function getMdAst(md: string, options: Options) {
  const markdown = markdownStringTransforms(
    md,
    options.markdownStringTransforms,
  );
  // console.log(markdown);

  const mdAstProcessor = createRemarkProcessor(options.mdAstTransforms);
  const mdAst = mdAstProcessor.parse(markdown);
  // console.dir(mdAst, { depth: null });

  return mdAstProcessor.run(mdAst);
}

function markdownStringTransforms(
  markdown: string,
  transforms: Options['markdownStringTransforms'],
) {
  return transforms.reduce((acc, fn) => fn(acc), markdown);
}
