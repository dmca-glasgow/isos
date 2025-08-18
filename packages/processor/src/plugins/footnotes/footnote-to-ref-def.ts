import { FootnoteDefinition, FootnoteReference, Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function footnoteToRefDef() {
  return (tree: Root) => {
    let count = 0;
    // console.dir(tree, { depth: null });
    visit(tree, 'textDirective', (node, idx, parent) => {
      if (['footnote', 'sidenote'].includes(node.name)) {
        ++count;

        const reference: FootnoteReference = {
          type: 'footnoteReference',
          identifier: String(count),
          label: String(count),
        };

        Object.assign(node, reference);

        const definition: FootnoteDefinition = {
          type: 'footnoteDefinition',
          identifier: String(count),
          label: String(count),
          children: [{ type: 'paragraph', children: node.children }],
        };

        const nextIdx = (idx || 0) + 1;
        parent?.children.splice(nextIdx, 0, definition);
      }
    });

    // move footnote definitions to their own paragraphs
    visit(tree, 'paragraph', (node, _idx, parent) => {
      const definitions = node.children.filter((o) => {
        // @ts-expect-error
        return o.type === 'footnoteDefinition';
      });

      if (parent && definitions.length) {
        node.children = node.children.filter((o) => {
          // @ts-expect-error
          return o.type !== 'footnoteDefinition';
        });

        const idx = _idx || 0;
        if (node.children.length > 0) {
          parent.children.splice(idx + 1, 0, ...definitions);
        } else {
          parent.children.splice(idx, 1, ...definitions);
        }
      }
    });
    // console.dir(tree, { depth: null });
  };
}
