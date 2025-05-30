import { ElementContent, Properties, Text } from 'hast';
import { PhrasingContent, Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { RefObjectYaml } from '../refs-and-counts/default-objects';
import { defaultTheorems } from './default-theorems';

export function theorems(ctx: Context) {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name === ' ') {
        const id = node.attributes?.id;
        if (id) {
          const [abbr] = id.split('-');
          const theorem = defaultTheorems.find((o) => o.abbr === abbr);

          if (theorem) {
            const ctxTheorem = ctx.frontmatter.theorems[theorem.name];
            createTheorem(node, theorem.name, ctxTheorem, id);
          }
        }
        if (node.attributes?.class?.split(' ').includes('proof')) {
          createTheorem(node, 'proof', ctx.frontmatter.theorems.proof);
        }
      }
    });
  };
}

function createTheorem(
  node: ContainerDirective,
  theoremName: string,
  theorem: RefObjectYaml,
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
  theorem: RefObjectYaml,
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

function createTitleElements(
  theorem: RefObjectYaml,
  label: PhrasingContent[],
) {
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
