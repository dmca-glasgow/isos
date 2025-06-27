import { BlockContent, Root, RootContent } from 'mdast';

export function headingSections() {
  return (tree: Root) => {
    const yaml = tree.children.filter((o) => o.type === 'yaml');
    const treeElements = tree.children.filter((o) => o.type !== 'yaml');

    let beforeFirstHeading = true;

    const newChildren = treeElements.reduce(
      (acc: RootContent[], node, idx) => {
        if (node.type === 'heading') {
          beforeFirstHeading = false;

          const data = node.data || {};
          const { id } = data.hProperties || {};
          delete data?.hProperties?.id;

          const next = treeElements
            .slice(idx + 1)
            .findIndex((o) => o.type === 'heading');
          const end = next === -1 ? undefined : idx + next + 1;
          const children = treeElements.slice(idx, end);
          acc.push(createSection(children, id as string));
        }

        if (beforeFirstHeading) {
          if (!acc[0]) {
            acc.push(createSection([node]));
          } else if (acc[0].type === 'containerDirective') {
            acc[0].children.push(node as BlockContent);
          }
        }

        return acc;
      },
      [],
    );

    tree.children = yaml;

    if (newChildren.length) {
      tree.children.push(...newChildren);
    } else if (treeElements.length) {
      tree.children.push(createSection(treeElements));
    }
  };
}

function createSection(children: RootContent[], id?: string): RootContent {
  return {
    type: 'containerDirective',
    name: 'section',
    children: children as BlockContent[],
    data: {
      hName: 'section',
      hProperties: {
        id,
      },
    },
  };
}
