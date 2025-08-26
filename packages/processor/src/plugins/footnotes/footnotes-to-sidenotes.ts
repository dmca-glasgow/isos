import { Element, ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { extractFootnoteDefinitions } from './extract-definitions';

export function footNotesToSideNotes(ctx: Context) {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    // console.log(ctx.frontmatter);
    // console.log(ctx.frontmatter.referenceLocation);
    if (ctx.frontmatter.referenceLocation !== 'margin') {
      return;
    }

    const footnotes = extractFootnoteDefinitions(tree);
    // console.dir(footnotes, { depth: null });
    if (footnotes === null) {
      return;
    }

    visit(tree, 'element', (node) => {
      if (node.type === 'element' && node.tagName === 'sup') {
        const { className } = node.properties;
        if (Array.isArray(className) && className.includes('fn-ref')) {
          const a = node.children[0] as ElementContent;

          if (a.type === 'element') {
            const href = String(a.properties.href || '');
            const id = href.replace(/^#fn-/, '');
            const { idx, definition } = findDefinition(footnotes, id);

            if (definition !== null) {
              const sideNote: ElementContent = {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['sidenote'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'sup',
                    properties: {
                      className: ['sidenote-count'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'a',
                        properties: {
                          id: `fn-${id}`,
                          href: `#fn-ref-${id}`,
                        },
                        children: [
                          {
                            type: 'text',
                            value: String(idx + 1),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['sidenote-label'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ' (sidenote: ',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'small',
                    properties: {
                      className: ['sidenote-content'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'sup',
                        properties: {
                          className: ['sidenote-count'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'a',
                            properties: {
                              id: `fn-ref-${id}`,
                              href: `#fn-${id}`,
                            },
                            children: [
                              {
                                type: 'text',
                                value: String(idx + 1),
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: ' ',
                          },
                        ],
                      },
                      ...definition,
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['sidenote-label'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ')',
                      },
                    ],
                  },
                ],
              };

              Object.assign(node, sideNote);
            }
          }
        }
      }
    });
  };
}

// appends an aside after the paragraph the footnote is mentioned.
// matches quarto margin notes (but with bug when used in list items).

// visit(tree, 'element', (node, idx, parent) => {
//   if (node.tagName === 'p') {
//     const refs = node.children.filter((o) => {
//       return o.type === 'element' && o.tagName === 'sup';
//     }) as Element[];
//     const definitions: Element[] = [];

//     refs.forEach((ref) => {
//       const { className } = ref.properties;
//       if (Array.isArray(className) && className.includes('fn-ref')) {
//         const a = ref.children[0] as Element;
//         const href = String(a.properties.href || '');
//         const id = href.replace(/^#fn-/, '');
//         const sideNotes = findFootnote(footnotes, id);

//         if (sideNotes !== null) {
//           definitions.push({
//             type: 'element',
//             tagName: 'aside',
//             properties: {
//               className: ['inline-fn'],
//               id: `fn-${id}`,
//             },
//             children: sideNotes,
//           });
//         }
//       }
//     });

//     const nextIdx = (idx || 0) + 1;
//     parent?.children.splice(nextIdx, 0, ...definitions);
//   }
// });

type Footnote = {
  idx: number;
  definition: ElementContent[] | null;
};

function findDefinition(definitions: Element[], id: string): Footnote {
  const idx = definitions.findIndex((o) => o.properties.id === `fn-${id}`);
  if (idx === -1) {
    return {
      idx,
      definition: null,
    };
  }
  let definition = definitions[idx].children;
  removeReturnArrow(definition);
  definition = paragraphsToSpans(definition);
  // console.log(definition);
  return { idx, definition };
}

function paragraphsToSpans(contents: ElementContent[]) {
  // console.dir(contents, { depth: 3 });
  const elements = contents.filter(
    (o) => o.type === 'element',
  ) as Element[];

  return elements.reduce((acc: ElementContent[], node, idx) => {
    if (node.tagName === 'p') {
      node.tagName = 'span';
    }

    if (idx > 0) {
      acc.push({
        type: 'text',
        value: ' ',
      });
    }

    const lastChild = node.children[node.children.length - 1];
    if (lastChild.type === 'text') {
      lastChild.value = lastChild.value.trimEnd();
    }

    acc.push(node);
    return acc;
  }, []);
  // console.log(contents);
}

function removeReturnArrow(children: ElementContent[]) {
  visit({ type: 'root', children }, 'element', (a, idx = 0, parent) => {
    if (a.tagName === 'a') {
      const href = String(a.properties?.href || '');
      if (href.startsWith('#fn-ref')) {
        parent?.children.splice(idx, 1);
      }
    }
  });
}
