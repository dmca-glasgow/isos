import { createProcessor, run } from '@mdx-js/mdx';
import { Root } from 'mdast';

import { createRemarkProcessor } from '../remark-processor';
import { processorOptions } from './hast-transforms';
import { Options } from './options';
import { createTableOfContents } from './sidebar';

export async function markdownToArticle(md: string, options: Options) {
  // console.log(md);
  const markdown = markdownStringTransforms(
    md,
    options.markdownStringTransforms,
  );
  // console.log(markdown);
  const mdAstProcessor = createRemarkProcessor(options.mdAstTransforms);
  const mdAst = mdAstProcessor.parse(markdown);
  // console.dir(mdAst, { depth: null });

  const transformed = await mdAstProcessor.run(mdAst);

  const mdxProcessor = createProcessor({
    ...processorOptions,
    rehypePlugins: options.htmlAstTransforms,
  });

  // @ts-expect-error: mdAst is not of type Program
  const esAst = await mdxProcessor.run(transformed);
  // console.log(2);
  // console.dir(esAst, {depth: null})

  const mdxString = mdxProcessor.stringify(esAst);

  return run(mdxString, options.mdxArticleRunOptions);
}

export async function markdownToTOC(markdown: string, _options: Options) {
  const options = {
    ..._options,
    noSections: true,
  };
  const mdAstProcessor = createRemarkProcessor(options.mdAstTransforms);
  const mdAst = mdAstProcessor.parse(markdown);
  // console.dir(mdAst, { depth: null });
  const transformed = await mdAstProcessor.run(mdAst);
  // console.dir(transformed, { depth: null });
  const jsString = await createTableOfContents(transformed as Root);

  return run(jsString, options.mdxTOCRunOptions);
}

function markdownStringTransforms(
  markdown: string,
  transforms: Options['markdownStringTransforms'],
) {
  return transforms.reduce((acc, fn) => fn(acc), markdown);
}
