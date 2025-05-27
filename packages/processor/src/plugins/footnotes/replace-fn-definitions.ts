import { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

export function replaceFootnoteDefinitions() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'section') {
        const { className } = node.properties;

        if (Array.isArray(className) && className.includes('footnotes')) {
          const ol = node.children.find((o) => {
            return o.type === 'element' && o.tagName === 'ol';
          }) as Element;

          if (ol) {
            const listItems = ol.children.filter((o) => {
              return o.type === 'element' && o.tagName === 'li';
            }) as Element[];

            listItems.forEach((listItem) => {
              const id = String(listItem.properties.id || '');
              listItem.properties.id = id.replace(/^user-content-/, '');
              replaceBackLink(listItem);
            });

            Object.assign(node, {
              properties: {
                className: ['footnotes'],
              },
              children: [
                {
                  type: 'element',
                  tagName: 'ol',
                  children: listItems.map((o) => ({
                    type: 'element',
                    tagName: 'li',
                    properties: {
                      id: o.properties.id,
                    },
                    children: o.children,
                  })),
                },
              ],
            });
          }
        }
      }
    });
  };
}

function replaceBackLink(node: Element) {
  const lastP = node.children.findLast(
    (o) => o.type === 'element' && o.tagName === 'p',
  ) as Element;
  const extracted = lastP.children.splice(-1, 1)[0] as Element;
  const href = String(extracted.properties.href || '');
  const refId = href.replace(/^#user-content-fnref-(.+)$/, '$1');

  lastP.children.push(createBackLink(refId));
}

function createBackLink(identifier: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: `#fn-ref-${identifier}`,
      // ariaLabel: 'Back to reference 2',
      // className: [ 'footnote-backref' ]
    },
    children: [{ type: 'text', value: '↩' }],
  };
}
