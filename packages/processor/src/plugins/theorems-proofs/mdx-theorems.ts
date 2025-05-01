import { ElementContent, Properties, Text } from 'hast';
import { PhrasingContent, Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { TheoremYaml, defaultTheorems } from './default-theorems';
import { createTheoremCounter } from './theorem-counter';

export function theorems(ctx: Context) {
  return (tree: Root) => {
    const counter = createTheoremCounter();
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      if (node.name === ' ') {
        if (node.attributes?.id) {
          const [abbr] = node.attributes.id.split('-');
          const theorem = defaultTheorems.find((o) => o.abbr === abbr);

          if (theorem) {
            // const unnumbered = node.attributes.class
            //   ?.split(' ')
            //   .find((s) => s === 'unnumbered');
            const ctxTheorem = ctx.theorems[theorem.name];
            const { referenceCounter, unnumbered } = ctxTheorem;
            const countRef = referenceCounter || theorem.name;
            const count = unnumbered ? 0 : counter.increment(countRef);
            createTheorem(node, count, theorem.name, ctxTheorem);
          }
        }
        if (node.attributes?.class?.split(' ').includes('proof')) {
          createTheorem(node, 0, 'proof', ctx.theorems.proof);
        }
      }
    });
  };
}

function createTheorem(
  node: ContainerDirective,
  count: number,
  name: string,
  theorem: TheoremYaml,
) {
  const properties: Properties = {
    className: removeDupes([theorem.style || '', name]),
  };

  if (name !== 'proof' && !theorem.unnumbered) {
    // TODO: check label list
    properties.id = node.attributes?.id;
  }

  node.data = {
    ...(node.data || {}),
    hProperties: {
      ...(node.data?.hProperties || {}),
      ...properties,
    },
  };

  const label = createTitle(
    theorem,
    name,
    count,
    node.attributes?.name || '',
  );
  const children = createTitleElements(theorem, label);
  const firstP = node.children.find((o) => o.type === 'paragraph');

  if (firstP) {
    firstP.children.unshift(...children);
  } else {
    node.children.push({
      type: 'paragraph',
      children,
    });
  }

  if (name === 'proof') {
    createQed(node);
  }
}

function createTitle(
  theorem: TheoremYaml,
  theoremName: string,
  count: number,
  name: string,
) {
  if (theoremName === 'proof') {
    return name || theorem.heading || '';
  }
  const label = name ? `(${name})` : '';
  return [theorem.heading, count, label].filter(Boolean).join(' ');
}

function removeDupes(arr: string[]) {
  return arr.reduce((acc: string[], s) => {
    if (Boolean(s) && !acc.includes(s)) {
      acc.push(s);
    }
    return acc;
  }, []);
}

function createTitleElements(theorem: TheoremYaml, label: string) {
  switch (theorem.style) {
    case 'plain':
    case 'definition':
      return createDefinitionTitle(label);
    case 'remark':
      return createRemarkTitle(label);
    default:
      throw new Error(`theorem style "${theorem.style}" not supported`);
  }
}

function createDefinitionTitle(label: string): PhrasingContent[] {
  const title: PhrasingContent = {
    type: 'strong',
    children: [
      {
        type: 'text',
        value: label,
      },
    ],
  };

  const space: Text = {
    type: 'text',
    value: ' ',
  };

  return [
    {
      ...title,
      data: {
        hName: 'span',
        hProperties: {
          class: 'title',
        },
        hChildren: [toHast(title)] as ElementContent[],
      },
    },
    space,
  ];
}

function createRemarkTitle(label: string): PhrasingContent[] {
  const title: PhrasingContent = {
    type: 'emphasis',
    children: [
      {
        type: 'text',
        value: label,
      },
    ],
  };

  const periodSpace: Text = {
    type: 'text',
    value: '. ',
  };

  return [
    {
      ...title,
      data: {
        hName: 'span',
        hProperties: {
          class: 'title',
        },
        hChildren: [toHast(title), periodSpace] as ElementContent[],
      },
    },
  ];
}

function createQed(node: ContainerDirective) {
  const proofBox: Text = {
    type: 'text',
    value: ' ◻',
    data: {
      hName: 'span',
      hProperties: {
        className: ['qed'],
      },
      hChildren: [
        {
          type: 'text',
          value: '◻',
        },
      ],
    },
  };

  const lastP = node.children.findLast((o) => o.type === 'paragraph');

  if (lastP) {
    lastP.children.push(proofBox);
  } else {
    node.children.push({
      type: 'paragraph',
      children: [proofBox],
    });
  }
}
