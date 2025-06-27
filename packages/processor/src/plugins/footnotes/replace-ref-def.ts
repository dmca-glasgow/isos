import { Element, ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

import { extractFootnoteDefinitions } from './extract-definitions';

export function replaceFootnoteRefDefs() {
  return (tree: Root) => {
    const footnotes = extractFootnoteDefinitions(tree);
    if (footnotes === null) {
      return;
    }

    const footnoteMap = footnotes.reduce(
      (acc: Record<string, number>, o, idx) => {
        const id = String(o.properties?.id || '');
        const match = id.match(/^user-content-fn-(.+)$/);
        if (match !== null) {
          acc[match[1]] = idx;
        }

        return acc;
      },
      {},
    );

    visit(tree, 'element', (node) => {
      if (node.tagName === 'sup') {
        const firstChild = node.children[0];
        if (
          firstChild &&
          firstChild.type === 'element' &&
          firstChild.tagName === 'a'
        ) {
          const href = String(firstChild.properties.href || '');
          const match = href.match(/^#fn-(.+)$/);
          if (match !== null) {
            const idx = footnoteMap[match[1]];
            const text = firstChild.children[0];
            if (text && text.type === 'text') {
              text.value = String(idx + 1);
            }
          }
        }
      }
    });

    tree.children.push({
      type: 'element',
      tagName: 'section',
      properties: {
        className: ['footnotes'],
      },
      children: [
        {
          type: 'element',
          tagName: 'h2',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Footnotes',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'ol',
          properties: {},
          children: footnotes.map((o) => ({
            type: 'element',
            tagName: 'li',
            properties: {
              id: String(o.properties.id || '').replace(
                'user-content-',
                '',
              ),
            },
            children: replaceBackRef(o),
          })),
        },
      ],
    });
  };
}

function replaceBackRef(footnote: Element): ElementContent[] {
  visit(footnote, 'element', (node) => {
    const { className } = node.properties;
    if (
      node.tagName === 'a' &&
      Array.isArray(className) &&
      className.includes('data-footnote-backref')
    ) {
      const href = String(node.properties.href || '').replace(
        'user-content-fnref',
        'fn-ref',
      );

      Object.assign(node, {
        type: 'element',
        tagName: 'a',
        properties: {
          href,
          // title: 'Back to reference 2'
          // ariaLabel: 'Back to reference 2',
          // className: [ 'footnote-backref' ]
        },
        children: [{ type: 'text', value: '↩' }],
      });
    }
  });

  return footnote.children;
}
