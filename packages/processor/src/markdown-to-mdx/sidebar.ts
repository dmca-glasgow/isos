import { List, ListItem, Nodes, Paragraph, Root } from 'mdast';
import { toc } from 'mdast-util-toc';

export function createTableOfContents(mdast: Root) {
  const { map: tocMdast } = toc(mdast as Nodes, {
    maxDepth: 3,
    minDepth: 2,
    tight: true,
  });

  const result: List = {
    type: 'list',
    ordered: true,
    children: [],
  };

  if (tocMdast === undefined) {
    console.log('[table of contents]: not generated');
  } else {
    result.children = inlineList(tocMdast.children || []);
  }

  return result;
}

function inlineList(list: ListItem[]) {
  return list.reduce((acc: ListItem[], h2) => {
    const h2p = h2.children[0] as Paragraph;
    const h2Item: ListItem = {
      type: 'listItem',
      children: [h2p],
      data: {
        hProperties: {
          className: 'depth-2',
        },
      },
    };
    acc.push(h2Item);

    const h3s = h2.children[1];
    if (h3s?.type === 'list') {
      const h3Items = h3s.children.map(
        (li): ListItem => ({
          type: 'listItem',
          children: li.children,
          data: {
            hProperties: {
              className: 'depth-3',
            },
          },
        }),
      );
      acc.push(...h3Items);
    }

    return acc;
  }, []);
}
