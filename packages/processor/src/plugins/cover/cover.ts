import { Element, ElementContent, Root as HastRoot } from 'hast';
import { Root } from 'mdast';
import { toHast } from 'mdast-util-to-hast';

import { Author, Context } from '../../markdown-to-mdx/context';
import { createRemarkProcessor } from '../../remark-processor';

export function cover({ frontmatter }: Context) {
  return (tree: Root) => {
    // console.log(frontmatter);
    const children: ElementContent[] = [];

    if (frontmatter.title) {
      children.push(createTitle(frontmatter.title));
    }
    if (frontmatter.author.length) {
      children.push(createAuthor(frontmatter.author));
    }
    if (frontmatter.date) {
      children.push(createDate(frontmatter.date));
    }
    if (frontmatter.abstract) {
      children.push(createAbstract(frontmatter.abstract));
    }

    if (children.length > 0) {
      tree.children.unshift({
        type: 'containerDirective',
        name: 'header',
        children: [],
        data: {
          hName: 'header',
          hChildren: children,
        },
      });
    }
    // console.dir(tree, { depth: null });
  };
}

function createTitle(title: string): Element {
  return {
    type: 'element',
    tagName: 'h1',
    properties: {},
    children: getInlineHast(title),
  };
}

function createAuthor(authors: Author[]): Element {
  if (authors.length === 1) {
    return {
      type: 'element',
      tagName: 'p',
      properties: {
        className: ['author'],
      },
      children: [
        {
          type: 'text',
          value: 'Written by ',
        },
        ...createAuthorContent(authors[0]),
      ],
    };
  } else {
    return {
      type: 'element',
      tagName: 'div',
      properties: {
        className: ['authors'],
      },
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Written by:',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'ul',
          properties: {},
          children: authors.map((author) => ({
            type: 'element',
            tagName: 'li',
            properties: {},
            children: createAuthorContent(author),
          })),
        },
      ],
    };
  }
}

function createAuthorContent(author: Author): ElementContent[] {
  const children = getInlineHast(author.name);

  if (author.orcid) {
    children.push(
      {
        type: 'text',
        value: ' ',
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `https://orcid.org/${author.orcid}`,
          target: '_blank',
          className: ['orcid'],
        },
        children: [
          {
            type: 'text',
            value: 'ORCID Link',
          },
        ],
      },
    );
  }

  if (author.affiliation) {
    children.push(
      {
        type: 'text',
        value: ', ',
      },
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['affiliation'],
        },
        children: getInlineHast(author.affiliation),
      },
    );
  }

  return children;
}

function createDate(date: string): Element {
  return {
    type: 'element',
    tagName: 'p',
    properties: {
      className: ['date'],
    },
    children: [
      {
        type: 'element',
        tagName: 'time',
        properties: {
          datetime: '2025-05-29', // TODO
        },
        children: getInlineHast(date),
      },
    ],
  };
}

function createAbstract(abstract: string): Element {
  return {
    type: 'element',
    tagName: 'aside',
    properties: {
      'aria-labelledby': 'h-abstract',
      className: 'abstract',
    },
    children: [
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'h-abstract',
        },
        children: [
          {
            type: 'text',
            value: 'Abstract',
          },
        ],
      },
      ...getBlockHast(abstract),
    ],
  };
}

function getBlockHast(str: string) {
  const processor = createRemarkProcessor();
  const parsed = processor.parse(str);
  const hast = toHast({
    type: 'root',
    children: parsed.children,
  }) as HastRoot;
  return hast.children as Element[];
}

function getInlineHast(str: string) {
  const hast = getBlockHast(str);
  const p = hast[0] as Element;
  return p.children;
}
