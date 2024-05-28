import { Code, InlineCode, Literal, Parent } from 'mdast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { createCounter } from '../../utils/counter';
import { Context } from '../context';

export function sideNote(ctx: Context) {
  const counter = createCounter();
  return (tree: Node) => {
    visit(tree, 'inlineCode', (node, idx, parent) => {
      if (
        hasTrailingPandocLatexTag(parent, idx) &&
        hasSideNoteSyntax(node)
      ) {
        const count = counter.increment('sidenote');
        createSideNote(node, count);
        removeTrailingPandocLatexTag(parent, idx);
        ctx.hasSidenotes = true;
      }
    });
    visit(tree, 'code', (node: Code) => {
      if (node.lang === '{=latex}' && hasSideNoteSyntax(node)) {
        const count = counter.increment('sidenote');
        createSideNote(node, count);
        ctx.hasSidenotes = true;
      }
    });
  };
}

function createSideNote(node: InlineCode | Code, count: number) {
  const id = `sidenote-${count}`;
  const content = extractSideNote(node);

  Object.assign(node, {
    type: 'sidenote',
    data: {
      hName: 'span',
      hProperties: {
        className: 'sidenote',
      },
      hChildren: [
        {
          type: 'element',
          tagName: 'label',
          properties: {
            tabindex: 0,
            title: content,
            'aria-describedby': id,
          },
          children: [
            {
              type: 'element',
              tagName: 'sup',
              children: [
                {
                  type: 'text',
                  value: String(count),
                },
              ],
            },
          ],
        },
        {
          type: 'element',
          tagName: 'small',
          properties: { id },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: 'sidenote-parenthesis',
              },
              children: [
                {
                  type: 'text',
                  value: '(sidenote: ',
                },
              ],
            },
            {
              type: 'element',
              tagName: 'sup',
              children: [
                {
                  type: 'text',
                  value: String(count),
                },
              ],
            },
            {
              type: 'text',
              value: ' ' + content,
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: 'sidenote-parenthesis',
              },
              children: [
                {
                  type: 'text',
                  value: ')',
                },
              ],
            },
          ],
        },
      ],
    },
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
