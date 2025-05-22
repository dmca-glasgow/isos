import { Element, ElementContent, Properties } from 'hast';
import {
  BlockContent,
  DefinitionContent,
  Paragraph,
  PhrasingContent,
  Root,
} from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { RefObjectYaml } from '../refs-and-counts/default-objects';
import { defaultFloats } from './default-floats';

export function divSyntax(ctx: Context) {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    visit(tree, 'containerDirective', (node) => {
      if (node.name === ' ') {
        const id = node.attributes?.id;
        if (id) {
          const [abbr] = id.split('-');
          const float = defaultFloats.find((o) => o.abbr === abbr);
          if (float) {
            const ctxObj = ctx.theorems[float.name];
            createFigure(node, float.name, ctxObj, id);
          }
        }
      }
    });
  };
}

function createFigure(
  node: ContainerDirective,
  floatName: string,
  ctxObj: RefObjectYaml,
  id?: string,
) {
  const properties: Properties = {
    id,
  };

  const { className } = node.attributes || {};
  if (Array.isArray(className)) {
    properties.className = removeDupes(className);
  }

  const { caption, content } = separateContentAndCaption(node);

  const children: ElementContent[] = [];

  if (caption.length > 0) {
    const captionHast = getCaptionHast(caption);
    children.push(
      {
        type: 'element',
        tagName: 'figCaption',
        properties: {},
        children: [
          {
            type: 'text',
            value: ctxObj.heading || '',
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`${ctxObj.abbr}-count`, floatName],
              'data-id': id,
            },
            children: [],
          },
          {
            type: 'text',
            value: ': ',
          },
          ...captionHast,
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
    );
  }

  const contentHast = getContentHast(content);
  children.push(...contentHast);

  node.data = {
    ...(node.data || {}),
    hName: 'figure',
    hProperties: {
      ...(node.data?.hProperties || {}),
      ...properties,
    },
    hChildren: children,
  };
}

function separateContentAndCaption({ children }: ContainerDirective) {
  if (children.length > 1) {
    const captionP = children[children.length - 1] as Paragraph;
    const rest = children.slice(0, -1);
    const content: (BlockContent | DefinitionContent | PhrasingContent)[] =
      [];
    if (rest.length === 1 && rest[0].type === 'paragraph') {
      content.push(...rest[0].children);
    } else {
      content.push(...rest);
    }
    return {
      caption: captionP.children as PhrasingContent[],
      content: content as (BlockContent | DefinitionContent)[],
    };
  } else {
    return {
      caption: [] as PhrasingContent[],
      content: children as (BlockContent | DefinitionContent)[],
    };
  }
}

function getCaptionHast(caption: PhrasingContent[]) {
  const captionHast = toHast({
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: caption,
      },
    ],
  }) as Element;
  const p = captionHast.children[0] as Element;
  return p.children;
}

function getContentHast(content: (BlockContent | DefinitionContent)[]) {
  const contentHast = toHast({
    type: 'root',
    children: content,
  }) as Element;

  return contentHast.children;
}

function removeDupes(arr: string[]) {
  return arr.reduce((acc: string[], s) => {
    if (Boolean(s) && !acc.includes(s)) {
      acc.push(s);
    }
    return acc;
  }, []);
}
