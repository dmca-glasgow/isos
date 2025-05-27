import { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';

export function footNotesToSideNotes(ctx: Context) {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    // console.log(ctx);
    if (ctx.referenceLocation !== 'margin') {
      return;
    }

    const footnotes = extractFootnoteDefinitions(tree);
    // console.dir(footnotes, { depth: null });
    if (footnotes === null) {
      return;
    }

    visit(tree, 'element', (node, idx, parent) => {
      if (node.tagName === 'p') {
        const refs = node.children.filter((o) => {
          return o.type === 'element' && o.tagName === 'sup';
        }) as Element[];

        const definitions: Element[] = [];

        refs.forEach((ref) => {
          const { className } = ref.properties;
          if (Array.isArray(className) && className.includes('fn-ref')) {
            const a = ref.children[0] as Element;
            const href = String(a.properties.href || '');
            const id = href.replace(/^#fn-/, '');
            const sideNotes = findFootnote(footnotes, id);

            if (sideNotes !== null) {
              definitions.push({
                type: 'element',
                tagName: 'aside',
                properties: {
                  className: ['inline-fn'],
                  id: `fn-${id}`,
                },
                children: sideNotes,
              });
            }
          }
        });

        const nextIdx = (idx || 0) + 1;
        parent?.children.splice(nextIdx, 0, ...definitions);
      }
    });
  };
}

function extractFootnoteDefinitions(tree: Root): Element[] | null {
  let definitions: Element[] | null = null;
  visit(tree, 'element', (node, idx, parent) => {
    if (node.tagName === 'section') {
      const { className } = node.properties;

      if (Array.isArray(className) && className.includes('footnotes')) {
        const ol = node.children[0] as Element;
        definitions = ol.children as Element[];

        // remove definitions section from tree
        parent?.children.splice(idx || 0, 1);
      }
    }
  });
  return definitions;
}

function findFootnote(
  definitions: Element[],
  id: string,
): Element[] | null {
  const def = definitions.find((o) => o.properties.id === `fn-${id}`);
  if (!def) {
    return null;
  }
  return injectSupMarker(def.children as Element[], id);
}

function injectSupMarker(sideNotes: Element[], id: string) {
  const firstP = sideNotes.find(
    (o) => o.type === 'element' && o.tagName === 'p',
  );
  firstP?.children.unshift(
    {
      type: 'element',
      tagName: 'sup',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#fn-ref-${id}`,
          },
          children: [
            {
              type: 'text',
              value: id,
            },
          ],
        },
      ],
    },
    {
      type: 'text',
      value: ' ',
    },
  );
  return sideNotes;
}
