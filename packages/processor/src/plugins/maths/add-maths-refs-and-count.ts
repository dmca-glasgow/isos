import { Properties, Root } from 'hast';
import { visit } from 'unist-util-visit';

export function addMathsRefsAndCount() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        const code = node.children[0];
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

            node.children.push({
              type: 'element',
              tagName: 'span',
              properties,
              children: [],
            });
          }
        }
      }
    });
  };
}
