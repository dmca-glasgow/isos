import type { Options as MdastOptions } from 'mdast-util-gfm';
import type { Options as MicromarkOptions } from 'micromark-extension-gfm';

import { gfmFromMarkdown, gfmToMarkdown } from './mdast-util-gfm';
import { gfm } from './micromark-extension-gfm';

interface Options extends MicromarkOptions, MdastOptions {}

const emptyOptions: Options = {};

// This is a copy of https://github.com/remarkjs/remark-gfm
// Allowing me to select which sub-processors to use

export default function remarkGfm(options: Options) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor<Root>} */ this;
  const settings = options || emptyOptions;
  const data = self.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push(gfm(settings));
  fromMarkdownExtensions.push(gfmFromMarkdown());
  toMarkdownExtensions.push(gfmToMarkdown(settings));
}
