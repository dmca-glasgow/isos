import { createProcessor, run } from '@mdx-js/mdx';
import { Root } from 'mdast';

import { createRemarkProcessor } from '../shared-utils/remark-pipeline';
import { processorOptions } from './hast-transforms';
import { Options } from './options';
import { createTableOfContents } from './sidebar';

export async function markdownToArticle(
  markdown: string,
  options: Options,
) {
  const mdAstProcessor = createRemarkProcessor(options.mdAstTransforms);
  const mdAst = mdAstProcessor.parse(markdown);
  const transformed = await mdAstProcessor.run(mdAst);
  const processor = createProcessor({
    ...processorOptions,
    rehypePlugins: options.htmlAstTransforms,
  });

  // @ts-expect-error: mdAst is not of type Program
  const esAst = await processor.run(transformed);
  const mdxString = processor.stringify(esAst);

  // console.dir(mdAst, { depth: null });
  // console.dir(transformed, { depth: null });
  // console.dir(esAst, {depth: null})

  return run(mdxString, options.mdxArticleRunOptions);
}

export async function markdownToTOC(markdown: string, _options: Options) {
  const options = {
    ..._options,
    noSections: true,
  };
  const mdAstProcessor = createRemarkProcessor(options.mdAstTransforms);
  const mdAst = mdAstProcessor.parse(markdown);
  const transformed = await mdAstProcessor.run(mdAst);
  const jsString = await createTableOfContents(transformed as Root);

  // console.dir(mdAst, { depth: null });
  // console.dir(transformed, { depth: null });

  return run(jsString, options.mdxTOCRunOptions);
}
