import { Options } from '../options';
import { boxouts } from './boxouts';
import { escapeCharsForMdx } from './escape-mdx-chars';
import { headings } from './headings';
import { references } from './references';
import { sidenotes } from './sidenotes';
import { Root } from 'mdast';
import { PluggableList } from 'unified';

import { createRemarkProcessor } from '../../shared-utils/remark-pipeline';
import { Context } from '../context';
// import { createTableOfContents } from '../sidebar';
import { center } from './center';
import { extractFrontmatter } from './extract-frontmatter';
import { fancyTitle } from './fancy-title';
import { sectionize } from './sectionize';
import { underline } from './underline';

export async function markdownToMdast(
  markdown: string,
  ctx: Context,
  options: Options,
) {
  const plugins: PluggableList = [
    [extractFrontmatter, ctx],
    [headings, ctx],
    fancyTitle,
    [references, ctx],
    [boxouts, ctx],
    [sidenotes, ctx],
    center,
    underline,
    // () => (tree) => {
    //   console.dir(tree, { depth: null });
    // },
  ];

  if (options.noSections === false) {
    plugins.push(sectionize);
  }

  // should be last
  plugins.push(escapeCharsForMdx);

  const processor = createRemarkProcessor(plugins);
  const mdast = processor.parse(markdown);
  return processor.run(mdast as Root);

  // const mdast = stage1.parse(markdown);
  // const transformed = await stage1.run(mdast as Root);

  // table of contents can't be generated after remark-sectionize
  // const tableOfContents = await createTableOfContents(transformed as Root);

  // const stage2 = createRemarkProcessor([
  //   sectionize,
  //   // should be last
  //   escapeCharsForMdx,
  // ]);
  // const withSectionized = await stage2.run(transformed as Root);

  // return {
  //   mdast: transformed,
  //   // tableOfContents,
  // };
}
