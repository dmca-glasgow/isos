import { Element, Root } from 'hast';
import kebabCase from 'lodash.kebabcase';
import { visit } from 'unist-util-visit';

import { serialiseAttributes } from '../images/formatted-caption';

export function tablePropertiesToTextDirective() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'div') {
        const { className } = node.properties;
        if (
          Array.isArray(className) &&
          className[0] === 'environment' &&
          className[1] === 'table'
        ) {
          const table = extractTable(node);
          if (table) {
            const caption = String(table.properties.caption || '');
            const id = kebabCase(String(table.properties.id || ''));
            const attributes = serialiseAttributes({ id });

            node.children.push({
              type: 'element',
              tagName: 'code',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: `:table-caption[${caption}]${attributes}`,
                },
              ],
            });
          }
        }
      }
    });
  };
}

function extractTable(env: Element): Element | null {
  let table: Element | null = null;
  visit(env, 'element', (node) => {
    if (node.tagName === 'table') {
      table = node;
    }
  });
  return table;
}
