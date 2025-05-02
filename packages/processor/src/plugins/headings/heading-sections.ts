import { BlockContent, Heading, Root, RootContent } from 'mdast';
import { findAfter } from 'unist-util-find-after';
import { visit } from 'unist-util-visit';

const MIN_HEADING_DEPTH = 1;
const MAX_HEADING_DEPTH = 6;

export function headingSections() {
  return (tree: Root) => {
    for (
      let depth = MAX_HEADING_DEPTH;
      depth > MIN_HEADING_DEPTH;
      depth--
    ) {
      visit(tree, 'heading', (node, index, parent) => {
        // console.dir(node, { depth: null });
        if (
          node.depth !== depth ||
          index === undefined ||
          parent === undefined
        ) {
          return;
        }

        const end = findAfter(parent, node, (next) => {
          if (next.type === 'heading') {
            const heading = next as Heading;
            return heading.depth <= node.depth;
          }
        });
        const endIndex = parent.children.indexOf(end as BlockContent);
        const children = parent.children.slice(
          index,
          endIndex > 0 ? endIndex : undefined,
        );

        // steal id from title and give it to section
        const hProps = node.data?.hProperties || {};
        const { id, ...hProperties } = hProps;
        node.data = {
          ...(node.data || {}),
          hProperties,
        };

        const section = {
          type: 'section',
          data: {
            hName: 'section',
            hProperties: { id },
          },
          children,
        };

        parent.children.splice(
          index,
          section.children.length,
          section as RootContent,
        );
      });
    }
  };
}
