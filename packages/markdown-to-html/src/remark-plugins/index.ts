import remarkMath from 'remark-math';
import { PluggableList } from 'unified';
import directive from 'remark-directive';
import frontmatter from 'remark-frontmatter';

import { unescapeOpenBrace } from './unescape-open-brace';
import { headingAttributes } from './heading-attributes';
import { linkAttributes } from './link-attributes';
import { columns } from './columns';
import { embedAssetUrl } from './embed-asset-url';
import { youtubeVideos } from './youtube-videos';
import { removeEmptyParagraphs } from './remove-empty-paragraphs';
import { gitGraph } from './gitgraph';
import { textFile } from './text-file';
import { sideNote } from './sidenote';
import { browserWindow } from './browser-window';
import { codeBlocks } from './code-blocks';
import { styledTerminal } from './styled-terminal';
import { images } from './images';
import { pagebreaks } from './pagebreaks';
import { Context } from '../context';

export function createRemarkPlugins(ctx: Context): PluggableList {
  return [
    unescapeOpenBrace,
    remarkMath,
    directive,
    frontmatter,
    // custom plugins:
    headingAttributes,
    linkAttributes,
    columns,
    [embedAssetUrl, ctx],
    youtubeVideos,
    removeEmptyParagraphs,
    gitGraph,
    textFile,
    [sideNote, ctx],
    browserWindow,
    [codeBlocks, ctx],
    styledTerminal,
    [images, ctx],
    pagebreaks,
  ];
}