import { parseLatexToMdast } from './1-parse-latex-to-mdast';
import { transformMdast } from './2-transform-mdast';
import { serialiseMdastToMarkdown } from './3-serialise-mdast-to-markdown';
import { parseMarkdownToMdast } from './4-parse-markdown-to-mdast';
import { transformMdastToJsx } from './5-transform-mdast-to-jsx';

enum InputType {
  'latex',
  'markdown',
}

export async function createAppProcessor(
  type: InputType,
  content: string
) {
  const { mdast } = await getMdast(type, content);
  const { precompiled } = await transformMdast(mdast);
  const { jsx } = await transformMdastToJsx(precompiled);
  return jsx;
}

export async function createUnitTestProcessor(
  type: InputType,
  content: string
) {
  const { mdast: _mdast } = await getMdast(type, content);
  const { precompiled } = await transformMdast(_mdast);
  const markdown = serialiseMdastToMarkdown(precompiled);
  const { mdast } = parseMarkdownToMdast(markdown);
  const { jsx } = await transformMdastToJsx(mdast);
  return {
    precompiled,
    markdown,
    mdast,
    jsx,
  };
}

export async function createRuntimeProcessor(markdown: string) {
  const { mdast } = parseMarkdownToMdast(markdown);
  const { jsx } = await transformMdastToJsx(mdast);
  return jsx;
}

export async function createBundleProcessor() {
  // TODO
}

export async function createIntegrationTestProcessor() {
  // TODO
}

function getMdast(type: InputType, content: string) {
  switch (type) {
    case InputType.latex:
      return parseLatexToMdast(content);
    default:
      return parseMarkdownToMdast(content);
  }
}
