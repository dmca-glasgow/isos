import GithubSlugger from 'github-slugger';
import { Heading, Root, Text } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { hasAttributes, parseAttributes } from '../../parse-attributes';

export function headings(_ctx: Context) {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    const slugger = new GithubSlugger();
    visit(tree, (node) => {
      if (node.type === 'heading') {
        transformHeading(node, slugger);
      }
    });
  };
}

function transformHeading(heading: Heading, slugger: GithubSlugger) {
  const childrenText = heading.children.filter(
    (o) => o.type !== 'textDirective',
  );
  const { text, attributes } = parseAttributes(toString(childrenText));
  const id = slugger.slug(attributes.id || text);
  const className = getClassNames(heading);

  // apply id and classes
  const hProperties = heading.data?.hProperties || {};
  hProperties.id = id;
  if (className.length > 0) {
    hProperties.className = className.join(' ');
  }
  heading.data = {
    ...(heading.data || {}),
    hProperties,
  };

  heading.children.unshift({
    type: 'text',
    value: '',
    data: {
      hName: 'span',
      hProperties: {
        className: [
          'heading-count',
          `depth-${heading.depth}`,
          ...attributes.classes,
        ],
      },
      hChildren: [
        {
          type: 'text',
          value: '',
        },
      ],
    },
  });
}

function getClassNames(heading: Heading) {
  const lastTextIdx = heading.children.findLastIndex(
    (o) => o.type === 'text',
  );
  const lastTextChild = heading.children[lastTextIdx] as Text;
  const lastChildValue = lastTextChild?.value || '';

  if (!hasAttributes(lastChildValue)) {
    return [];
  }

  const { text, attributes } = parseAttributes(lastChildValue);
  lastTextChild.value = text;
  return attributes.classes.filter((s) => s !== 'unnumbered');
}
