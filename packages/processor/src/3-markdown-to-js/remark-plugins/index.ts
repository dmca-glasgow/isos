// import remarkMath from 'remark-math';
import { boxouts } from './boxouts';
import { headingAttributes } from './heading-attributes';
import { linkAttributes } from './link-attributes';
import directive from 'remark-directive';
import { PluggableList } from 'unified';

// import { codeBlocks } from './code-blocks';
// import { styledTerminal } from './styled-terminal';
// import { images } from './images';
// import { pagebreaks } from './pagebreaks';
import { Context } from '../context';
// import { columns } from './columns';
// import { embedAssetUrl } from './embed-asset-url';
// import { youtubeVideos } from './youtube-videos';
// import { removeEmptyParagraphs } from './remove-empty-paragraphs';
// import { gitGraph } from './gitgraph';
// import { textFile } from './text-file';
// import { sideNote } from './sidenote';
import { browserWindow } from './browser-window';
// import remarkMdxEnhanced from 'remark-mdx-math-enhanced';
// import frontmatter from 'remark-frontmatter';
import { unescapeOpenBrace } from './unescape-open-brace';

export function createRemarkPlugins(ctx: Context): PluggableList {
  return [
    unescapeOpenBrace,
    // remarkMath,
    directive,
    // () => (tree) => {
    //   console.log(JSON.stringify(tree, null, 2));
    // },
    // remarkMdxEnhanced,
    // frontmatter,
    // // custom plugins:
    [boxouts, ctx],
    // [programSwitcher, ctx],
    // [languageSwitcher, ctx],
    // [plotAccessibilitySwitcher, ctx],
    headingAttributes,
    linkAttributes,
    // columns,
    // [embedAssetUrl, ctx],
    // youtubeVideos,
    // removeEmptyParagraphs,
    // gitGraph,
    // textFile,
    // [sideNote, ctx],
    browserWindow,
    // [codeBlocks, ctx],
    // styledTerminal,
    // [images, ctx],
    // pagebreaks,
  ];
}
