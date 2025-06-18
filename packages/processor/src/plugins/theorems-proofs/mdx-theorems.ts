import { ElementContent, Properties, Text } from 'hast';
import { PhrasingContent, Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { Theorem } from './default-theorems';

export function theorems(ctx: Context) {
  return (tree: Root) => {
    // const theorems = prepareTheorems(ctx);
    const { theorems } = ctx.frontmatter;

    const refArr = Object.entries(theorems).map(([name, theorem]) => {
      return { name, ...theorem };
    }) as Theorem[];

    const theoremArr = refArr.filter((o) => o.type === 'theorem');

    visit(tree, 'containerDirective', (node) => {
      if (node.name === ' ') {
        const id = node.attributes?.id;
        if (id) {
          const [abbr] = id.split('-');
          const theorem = theoremArr.find((o) => o.abbr === abbr);

          if (theorem) {
            createTheorem(node, theorem, theorem.name, id);
          }
        }
        if (node.attributes?.class?.split(' ').includes('proof')) {
          const proof = theoremArr.find(
            (o) => o.name === 'proof',
          ) as Theorem;
          createTheorem(node, proof, 'proof');
        }
      }
    });
  };
}

// function prepareTheorems(ctx: Context) {
//   const { custom, ...theorems } = ctx.frontmatter.theorems;
//   return [
//     ...Object.entries(theorems).map(([name, theorem]) => ({
//       name,
//       ...theorem,
//     })),
//     ...(custom || []),
//   ] as Theorem[];
// }

function createTheorem(
  node: ContainerDirective,
  theorem: Theorem,
  theoremName: string,
  id?: string,
) {
  const properties: Properties = {
    className: removeDupes([theorem.style || '', theoremName]),
  };

  if (theoremName !== 'proof' && !theorem.unnumbered) {
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

  const customName = node.attributes?.name || undefined;
  const label = createTitle(theorem, theoremName, customName, id);
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

  if (theoremName === 'proof') {
    createQed(node);
  }
}

function createTitle(
  theorem: Theorem,
  theoremName: string,
  name?: string,
  id?: string,
) {
  if (theoremName === 'proof') {
    return [
      {
        type: 'text',
        value: name || theorem.heading || '',
      },
    ] as PhrasingContent[];
  }

  const result: PhrasingContent[] = [
    {
      type: 'text',
      value: theorem.heading || '',
    },
    {
      type: 'text',
      value: '',
      data: {
        hName: 'span',
        hProperties: {
          className: ['thm-count', theoremName],
          ['data-id']: id || null,
        },
        hChildren: [],
      },
    },
  ];

  if (name) {
    result.push({
      type: 'text',
      value: ` (${name})`,
    });
  }

  return result;
}

function createTitleElements(theorem: Theorem, label: PhrasingContent[]) {
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

function createDefinitionTitle(
  label: PhrasingContent[],
): PhrasingContent[] {
  const title: PhrasingContent = {
    type: 'strong',
    children: label,
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

function createRemarkTitle(label: PhrasingContent[]): PhrasingContent[] {
  const title: PhrasingContent = {
    type: 'emphasis',
    children: label,
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

function removeDupes(arr: string[]) {
  return arr.reduce((acc: string[], s) => {
    if (Boolean(s) && !acc.includes(s)) {
      acc.push(s);
    }
    return acc;
  }, []);
}
