import { Element, Root } from 'hast';
import { findAndReplace } from 'hast-util-find-and-replace';

import { Context, Reference } from '../../markdown-to-mdx/context';

const pattern = /@([\w-]+)/g;

export default function atReferenceToLink(ctx: Context) {
  return (tree: Root) => {
    // console.log(ctx.refMap);
    findAndReplace(tree, [
      pattern,
      (_, ref) => {
        const reference = ctx.refMap[ref];
        if (reference) {
          return createReferenceLink(reference);
        } else {
          // TODO: warn about undefined reference
          // console.error(`undefined reference: ${ref}`);

          return createBrokenReferenceWarning(ref);
        }
      },
    ]);
  };
}

function createReferenceLink(reference: Reference): Element | null {
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

function createBrokenReferenceWarning(ref: string): Element | null {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      class: 'error',
    },
    children: [{ type: 'text', value: `?@${ref}` }],
  };
}
