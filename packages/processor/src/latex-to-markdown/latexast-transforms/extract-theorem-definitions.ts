import {
  Argument,
  Macro,
  Root,
  String,
} from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

import { TheoremOptions, Theorems } from '../../shared-utils/theorem';
import { Context } from '../context';

export function extractTheoremDefinitions(ctx: Context) {
  return (tree: Root) => {
    const theorems: Theorems = {};
    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'newtheorem') {
        const { environment, ...options } = extractTheorem(node);
        theorems[environment] = options;
      }
    });

    ctx.frontmatter.theorems = theorems;
  };
}

// Theorem definitions are defined in section 3.4 of:
// https://anorien.csc.warwick.ac.uk/mirrors/CTAN/info/amscls-doc/Author_Handbook_ProcColl.pdf

type Theorem = TheoremOptions & {
  environment: string;
  heading: string;
  numberWithin?: string;
  referenceCounter?: string;
};

function extractTheorem(node: Macro): Theorem {
  const args = (node.args || [])
    .filter((o) => o.content.length === 1)
    .map((arg: Argument) => ({
      openMark: arg.openMark,
      content: (arg.content[0] as String).content,
    }));

  if (
    args.length === 2 &&
    args[0].openMark === '{' &&
    args[1].openMark === '{'
  ) {
    return {
      environment: args[0].content,
      heading: args[1].content,
    };
  }

  if (
    args.length === 3 &&
    args[0].openMark === '{' &&
    args[1].openMark === '{' &&
    args[2].openMark === '['
  ) {
    return {
      environment: args[0].content,
      heading: args[1].content,
      numberWithin: args[2].content,
    };
  }

  if (
    args.length === 3 &&
    args[0].openMark === '{' &&
    args[1].openMark === '[' &&
    args[2].openMark === '{'
  ) {
    return {
      environment: args[0].content,
      heading: args[2].content,
      referenceCounter: args[1].content,
    };
  }

  throw new Error('theorem definition not supported');
}
