import {
  directiveFromMarkdown,
  directiveToMarkdown,
} from 'mdast-util-directive';

// Inlined micromark extension directive to allow for syntax ::: {attributes}
import { directive } from './micromark-extension-directive';

export default function remarkDirective() {
  // @ts-expect-error: TS is wrong about `this`.
  const self = /** @type {Processor<Root>} */ this;
  const data = self.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push(directive());
  fromMarkdownExtensions.push(directiveFromMarkdown());
  toMarkdownExtensions.push(directiveToMarkdown());
}
