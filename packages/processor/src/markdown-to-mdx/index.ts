import {
  ProcessorOptions,
  RunOptions,
  createProcessor,
  run,
} from '@mdx-js/mdx';
import { Node, Root } from 'mdast';

import { createRemarkProcessor } from '../remark-processor';
import { processorOptions } from './hast-transforms';
import { Options } from './options';
import { createTableOfContents } from './sidebar';

export async function markdownToArticle(md: string, options: Options) {
  const mdAst = await getMdAst(md, options);
  // console.dir(mdAst, { depth: null });

  const procOptions: ProcessorOptions = {
    ...processorOptions,
    rehypePlugins: options.htmlAstTransforms,
  };
  return createMDX(mdAst, procOptions, options.mdxArticleRunOptions);
}

export async function markdownToTOC(md: string, options: Options) {
  const mdAst = await getMdAst(md, options);
  // console.dir(mdAst, { depth: null });

  const toc = createTableOfContents(mdAst as Root);
  // console.dir(toc, { depth: null });

  return createMDX(toc, processorOptions, options.mdxTOCRunOptions);
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

async function createMDX(
  mdAst: Node,
  options: ProcessorOptions,
  runOptions: RunOptions,
) {
  const processor = createProcessor(options);
  // @ts-expect-error: mdAst is not of type Program
  const esAst = await processor.run(mdAst);
  const mdxString = processor.stringify(esAst);
  return run(mdxString, runOptions);
}
