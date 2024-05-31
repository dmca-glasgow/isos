import {
  Element,
  ElementContent,
  Parent as HastParent,
  Node,
  Text,
} from 'hast';
import startCase from 'lodash/startCase.js';
import { Literal, Paragraph, Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { Parent } from 'unist';
import { visit } from 'unist-util-visit';

import { boxoutAllowList } from '../../utils/boxout-allow-list';
import { createCounter } from '../../utils/counter';
import { Context } from '../context';

export function boxouts(refStore: Context['refStore']) {
  const counter = createCounter();
  return (tree: Node) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      const name = node.name.trim();
      if (boxoutAllowList.includes(name)) {
        const count = counter.increment(name);
        node.data = {
          hProperties: createAttributes(node, count, refStore),
          hChildren: createBoxout(node, count) as any,
        };
      }
    });
  };
}

function createAttributes(
  node: ContainerDirective,
  count: number,
  refStore: Context['refStore']
) {
  const name = node.name.trim();

  const attributes = node.attributes as Record<string, string>;
  const className = ['boxout', name];
  if (attributes.icon) {
    className.push(`${attributes.icon}-icon`);
  }

  if (name === 'proof') {
    return { className };
  }

  const id = node.attributes?.id || `${name}-${count}`;
  if (
    node.attributes?.label !== undefined &&
    node.attributes?.label !== null
  ) {
    refStore[node.attributes.label] = id;
  }

  return { className, id };
}

export function createBoxout(
  node: ContainerDirective,
  count: number
): Node[] {
  const titles = [];
  const content = [];
  const children = node.children as Paragraph[];
  const typeTitle = createBoxoutType(node, count);
  titles.push(typeTitle);

  const titleValue = getTitleValue(node);
  if (titleValue.length > 0) {
    const title = createTitle(node);
    titles.push(title);
  }

  content.push(
    ...children
      .filter((o) => !o.data?.directiveLabel)
      .filter((o) => {
        // @ts-expect-error
        return o.type !== 'containerDirective' && o.name !== 'answer';
      })
      .map((o) => toHast(o, { allowDangerousHtml: true }))
      .filter(Boolean)
  );

  const lastP = content[content.length - 1] as Element;
  const lastItem = lastP.children[lastP.children.length - 1];

  if (lastItem.type === 'text') {
    const lastText = lastItem as Literal;
    const lastValue = lastText.value;
    const lastChar = lastValue[lastValue.length - 1];
    if (lastChar === '◻') {
      lastText.value = lastValue.slice(0, -2);
      lastP.children.push({
        type: 'element',
        tagName: 'span',
        properties: {
          class: 'proof-box',
        },
        children: [
          {
            type: 'text',
            value: '◻',
          },
        ],
      });
    }
  }

  if (node.name === 'task') {
    const answer = children.find(
      // @ts-expect-error
      (o) => o.type === 'containerDirective' && o.name === 'answer'
    ) as unknown as ContainerDirective | undefined;

    if (answer) {
      const answerHast = createAnswer(answer, count);
      content.push(answerHast as HastParent);
    }
  }

  return [...titles, ...content];
}

function createBoxoutType(
  node: ContainerDirective,
  count: number
): Element {
  const name = node.name.trim();
  const label = startCase(name);

  let value = label;
  if (node.name !== 'proof') {
    value += ` ${count}`;
  }

  if (node.attributes?.optional !== undefined) {
    value += ` (Optional)`;
  }

  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['type'],
    },
    children: [
      {
        type: 'text',
        value,
      },
    ],
  };
}

function createTitle(node: ContainerDirective): Element {
  return {
    type: 'element',
    tagName: 'h3',
    children: createTitleValue(node) as ElementContent[],
    properties: {},
  };
}

function createTitleValue(node: ContainerDirective) {
  const name = node.name as string;
  const newRoot = {
    type: 'root',
    children: getTitleValue(node),
  };
  const { children = [] } = toHast(newRoot as Root) as Parent;
  if (name !== 'weblink') {
    return children;
  }
  const { target } = node.attributes as Record<string, string>;
  return [
    {
      type: 'element',
      tagName: 'a',
      properties: {
        href: target,
        target: '_blank',
        className: ['target'],
      },
      children,
    },
  ];
}

function getTitleValue(node: ContainerDirective): Node[] {
  const children = (node.children || []) as Node[];
  const parent = (children[0] || {}) as Parent;

  // @ts-expect-error
  if (!parent.data?.directiveLabel) {
    if (node.name === 'weblink') {
      const attributes = node.attributes as Record<string, string>;
      return [
        {
          type: 'text',
          value: attributes.target,
        } as Text,
      ];
    }
    return [];
  }

  return parent.children || [];
}

function createAnswer(node: ContainerDirective, count: number) {
  const { children } = toHast(node) as HastParent;
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['answer'],
    },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['answer-trigger'],
          'data-answer-id': count,
        },
        children: [
          {
            type: 'text',
            value: 'Show answer',
          },
        ],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['answer-reveal'],
          id: `answer-${count}`,
        },
        children,
      },
    ],
  };
}
