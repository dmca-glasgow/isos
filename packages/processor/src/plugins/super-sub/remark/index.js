// This plugin is a copy of remark-math removing mathFlow construct with
// the $ symbol replaced for ^ for superscript and ~ for subscript.
// https://github.com/remarkjs/remark-math
// It includes functions from micromark-extension-math and mdast-util-math
// https://github.com/syntax-tree/mdast-util-math
// https://github.com/micromark/micromark-extension-math
import { codes } from 'micromark-util-symbol';

import { subscriptText } from './subscript';
import { subscriptFromMarkdown } from './subscript/from-markdown';
import { subscriptToMarkdown } from './subscript/to-markdown';
import { superscriptText } from './superscript';
import { superscriptFromMarkdown } from './superscript/from-markdown';
import { superscriptToMarkdown } from './superscript/to-markdown';

const emptyOptions = {};

export function remarkSuperSub(options) {
  const self = /** @type {Processor<Root>} */ (this);
  const settings = options || emptyOptions;
  const data = self.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push({
    text: {
      [codes.caret]: superscriptText(options),
      [codes.tilde]: subscriptText(options),
    },
  });

  fromMarkdownExtensions.push(
    superscriptFromMarkdown(),
    subscriptFromMarkdown(),
  );

  toMarkdownExtensions.push(
    superscriptToMarkdown(settings),
    subscriptToMarkdown(settings),
  );
}
