import { processorOptions } from './hast-transforms';
import { createProcessor } from '@mdx-js/mdx';
import { RunOptions } from '@mdx-js/mdx';
import { ListItem, Nodes, Paragraph, Root } from 'mdast';
import { toc } from 'mdast-util-toc';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { TocListItem } from './mdx-handlers/toc-highlight/toc-list-item';

export const sidebarRunOptions: RunOptions = {
  Fragment,
  useMDXComponents() {
    return {
      li: TocListItem,
    };
  },

  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};

export async function createTableOfContents(mdast: Root) {
  const { map: tocMdast } = toc(mdast as Nodes, {
    maxDepth: 3,
    minDepth: 2,
    tight: true,
    // parents: ['tree', 'section'],
  });

  // if (tocMdast === undefined) {
  //   return [];
  // }
  // return inlineList(tocMdast.children || []);

  if (tocMdast === undefined) {
    return '';
  }

  const list = inlineList(tocMdast.children || []);
  // console.log(list);

  const processor = createProcessor(processorOptions);

  const estree = await processor.run({
    // @ts-expect-error: mdast is not of type Program
    type: 'list',
    ordered: true,
    children: list,
  });

  return processor.stringify(estree);
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
