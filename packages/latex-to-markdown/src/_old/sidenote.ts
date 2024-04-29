import { Code, InlineCode, Literal, Parent } from 'mdast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { createCounter } from '../utils/counter';
import { Context } from './context';
// import { latexArticleWrapper } from './utils/latex-article-wrapper';
import { processLatex } from '../process-latex';

export function sideNote(ctx: Context) {
  const counter = createCounter();
  return (tree: Node) => {
    visit(tree, 'inlineCode', (node, idx, parent) => {
      if (hasTrailingPandocLatexTag(parent, idx)) {
        const count = counter.increment('sidenote');
        createSideNote(ctx, node, count);
        removeTrailingPandocLatexTag(parent, idx);
        ctx.hasSidenotes = true;
      }
    });
    visit(tree, 'code', (node: Code) => {
      if (node.lang === '{=latex}') {
        const count = counter.increment('sidenote');
        createSideNote(ctx, node, count);
        ctx.hasSidenotes = true;
      }
    });
  };
}

async function createSideNote(
  ctx: Context,
  node: InlineCode | Code,
  count: number
) {
  const id = `sidenote-${count}`;
  const content = extractSideNote(node);

  // TODO
  // ✓1. create a default documentclass
  // ✓2. extract preamble and override default
  // ✓3. wrap content^^ in synethetic documentclass
  // 4. send to pandoc for rendering WITHOUT raw_tex
  // 5. parse pandoc markdown to MDAST
  // 6. insert MDAST into leafDirective
  // 7. bobs your uncle

  // console.log('content', content);

  // const wrapped = latexArticleWrapper(ctx.preamble, content);
  // console.log('wrapped', wrapped);

  const mdast = processLatex(node.value);
  // console.log('mdast', mdast);

  Object.assign(node, {
    type: 'leafDirective',
    name: 'sidenote',
    children: [
      {
        type: 'text',
        value: content,
      },
    ],
  });
}

function hasTrailingPandocLatexTag(parent: Parent, idx: number) {
  const node = (parent.children[idx + 1] || {}) as Literal;
  return node.type === 'text' && node.value.startsWith('{=latex}');
}

function hasSideNoteSyntax(node: InlineCode | Code) {
  const value = node.value.trim();
  return value.slice(0, 10) === '\\sidenote{' && value.slice(-1) === '}';
}

function removeTrailingPandocLatexTag(parent: Parent, idx: number) {
  const node = (parent.children[idx + 1] || {}) as Literal;
  node.value = node.value.slice(8);
}

function extractSideNote(node: InlineCode | Code) {
  return node.value.trim().slice(10, -1);
}
