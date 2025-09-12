import { Element, Root, Text } from 'hast';
import { findAndReplace } from 'hast-util-find-and-replace';

import { Context, Reference } from '../../markdown-to-mdx/context';

const pattern = /(^|[^a-zA-Z0-9])@([\w-]+)/g;

export default function atReferenceToLink(ctx: Context) {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
    // console.log(ctx.frontmatter.refMap);
    findAndReplace(tree, [
      pattern,
      (_, prefix, ref) => {
        const reference = ctx.frontmatter.refMap[ref];
        // console.log(ref, reference);

        const output: (Element | Text)[] = [
          {
            type: 'text',
            value: prefix,
          },
        ];

        if (reference) {
          output.push(createReferenceLink(reference));
        } else {
          // TODO: warn about undefined reference
          // console.error(`undefined reference: ${ref}`);

          output.push(createBrokenReferenceWarning(ref));
        }

        return output;
      },
    ]);
  };
}

function createReferenceLink(reference: Reference): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: `#${reference.id}`,
      class: 'ref',
    },
    children: [{ type: 'text', value: reference.label }],
  };
}

function createBrokenReferenceWarning(ref: string): Element {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`unknown ref:`, ref);
  }
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      class: 'warn',
    },
    children: [
      {
        type: 'element',
        tagName: 'strong',
        properties: {},
        children: [{ type: 'text', value: `unknown ref:` }],
      },
      {
        type: 'text',
        value: ' ',
      },
      {
        type: 'element',
        tagName: 'code',
        properties: {},
        children: [{ type: 'text', value: ref }],
      },
    ],
  };
}
