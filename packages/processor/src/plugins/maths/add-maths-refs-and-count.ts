import { Properties, Root } from 'hast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export function addMathsRefsAndCount() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        const code = node.children[0];
        // console.log(code);
        if (code && code.type === 'element' && code.tagName === 'code') {
          const { className } = code.properties;
          if (
            Array.isArray(className) &&
            className.includes('language-math')
          ) {
            const properties: Properties = {
              className: ['eq-count', 'equation'],
            };

            const id = String(node.properties['data-id'] || '');
            if (id) {
              code.properties.id = id;
              properties['data-id'] = id;
            }

            const str = toString(code);
            if (
              str.startsWith('\\begin{equation}') ||
              str.startsWith('\\begin{align}')
            ) {
              node.children.push({
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['eq-count'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties,
                    children: [],
                  },
                ],
              });
            }
          }
        }
      }
    });
  };
}
