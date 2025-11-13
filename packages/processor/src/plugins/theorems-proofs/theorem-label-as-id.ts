import kebabCase from 'lodash.kebabcase';
import { Root } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

import { Context } from '../../input-to-markdown/context';
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
      const type = getTypeFromClass(klass, ctx);

      if (type !== undefined && type !== 'proof') {
        const label = extractLabelFromContainer(node);
        const theorem = theorems[type];
        const typeKey = theorem?.abbr || type;
        const id =
          label !== null
            ? idFromLabel(label, typeKey, ctx)
            : idFromCount(counter.increment(type), typeKey);

        // console.log({ label, id });

        const { unnumbered } = theorems[type];
        const newClass = prepareClasses(klass, type, unnumbered);

        node.attributes = {
          ...(node.attributes || {}),
          id: kebabCase(id),
          class: newClass,
        };

        if (!newClass) {
          delete node.attributes.class;
        }
      }
    });
  };
}

function getTypeFromClass(str: string, ctx: Context) {
  const { theorems } = ctx.frontmatter;
  const names = Object.keys(theorems);
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

function idFromLabel(label: string, typeKey: string = '', ctx: Context) {
  const { theorems } = ctx.frontmatter;
  const [key, value] = label.split(':');
  if (defaultTheorems.map((o) => o.abbr).includes(key)) {
    return `${key}-${value}`;
  } else if (theorems[key]) {
    return `${key}-${value}`;
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
