import { Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

import { Context } from '../../latex-to-markdown/context';
import { defaultTheorems } from './default-theorems';
import { createTheoremCounter } from './theorem-counter';

export function theoremLabelAsId(ctx: Context) {
  return (tree: Root) => {
    const { theorems } = ctx.frontmatter;
    const counter = createTheoremCounter();

    // console.dir(tree, { depth: null });
    visit(tree, 'containerDirective', (node) => {
      // console.dir(node, { depth: null });

      const klass = node.attributes?.class || '';
      const type = getTypeFromClass(klass);

      if (type !== undefined && type !== 'proof') {
        const label = extractLabelFromContainer(node);
        const theorem = defaultTheorems.find((o) => o.name === type);
        const typeKey = theorem?.abbr;
        const id =
          label !== null
            ? idFromLabel(label, typeKey)
            : idFromCount(counter.increment(type), typeKey);

        const { unnumbered } = theorems[type];
        const newClass = prepareClasses(klass, type, unnumbered);

        node.attributes = {
          ...(node.attributes || {}),
          id,
          class: newClass,
        };

        if (!newClass) {
          delete node.attributes.class;
        }
      }
    });
  };
}

function getTypeFromClass(str: string) {
  const names = defaultTheorems.map((o) => o.name);
  return str.split(' ').find((s) => names.includes(s));
}

function extractLabelFromContainer(
  node: ContainerDirective,
): string | null {
  let label: string | null = null;

  visit(node, 'textDirective', (node, idx, parent) => {
    if (node.name === 'label') {
      const text = node.children[0];
      if (
        text &&
        text.type === 'text' &&
        typeof text.value === 'string' &&
        text.value.trim() !== ''
      ) {
        label = text.value;

        if (parent) {
          // trim whitespace from neighbour
          const nextSibling = parent.children[(idx || 0) + 1];
          if (nextSibling && nextSibling.type === 'text') {
            nextSibling.value = nextSibling.value.trimStart();
          }

          // remove label textDirective from tree
          parent.children.splice(idx || 0, 1);
        }
      }
    }
  });

  return label;
}

function idFromLabel(label: string, typeKey: string = '') {
  const [key] = label.split('-');
  if (defaultTheorems.map((o) => o.abbr).includes(key)) {
    return label;
  } else {
    return `${typeKey}-${label}`;
  }
}

function idFromCount(count: number, typeKey: string = '') {
  return `${typeKey}-${count}`;
}

function prepareClasses(
  type: string,
  prev: string,
  _unnumbered?: boolean,
) {
  const classes = prev.split(' ');
  // if (unnumbered) {
  //   classes.push('unnumbered');
  // }
  return classes
    .filter((s) => s !== type)
    .join(' ')
    .trim();
}
