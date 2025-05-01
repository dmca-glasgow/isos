import {
  Argument,
  Macro,
  Root,
  String,
} from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { visit } from '@unified-latex/unified-latex-util-visit';

import { Context } from '../../latex-to-markdown/context';
import { Theorem, createDefaultTheoremsYaml } from './default-theorems';

export function extractTheoremDefinitions(ctx: Context) {
  return (tree: Root) => {
    let style: Theorem['style'] = 'plain';
    let theorems = createDefaultTheoremsYaml();

    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'theoremstyle') {
        const args = getArgsContent(node);
        style = printRaw(args[args.length - 1] || []) as Theorem['style'];
      }

      if (node.type === 'macro' && node.content === 'newtheorem') {
        const { name, ...theorem } = extractTheorem(node, style);

        theorems = {
          ...theorems,
          [name]: {
            ...(theorems[name] || {}),
            ...theorem,
          },
        };
      }
    });
    ctx.frontmatter.theorems = theorems;
  };
}

// Theorem definitions are defined in section 3.4 of:
// https://anorien.csc.warwick.ac.uk/mirrors/CTAN/info/amscls-doc/Author_Handbook_ProcColl.pdf

function extractTheorem(node: Macro, style: Theorem['style']): Theorem {
  const args2 = node.args || [];
  const firstArgContent = args2[0].content[0] as String;
  const unnumbered = firstArgContent?.content === '*';

  if (unnumbered) {
    args2.splice(0, 1);
  }

  const args = args2
    .filter((o) => o.content.length > 0)
    .map((arg: Argument) => ({
      openMark: arg.openMark,
      content: printRaw(arg.content).replace(/\*$/, ''),
    }));

  if (
    args.length === 2 &&
    args[0].openMark === '{' &&
    args[1].openMark === '{'
  ) {
    return {
      style,
      name: args[0].content,
      heading: args[1].content,
      unnumbered,
    };
  }

  if (
    args.length === 3 &&
    args[0].openMark === '{' &&
    args[1].openMark === '{' &&
    args[2].openMark === '['
  ) {
    return {
      style,
      name: args[0].content,
      heading: args[1].content,
      numberWithin: args[2].content,
      unnumbered,
    };
  }

  if (
    args.length === 3 &&
    args[0].openMark === '{' &&
    args[1].openMark === '[' &&
    args[2].openMark === '{'
  ) {
    return {
      style,
      name: args[0].content,
      heading: args[2].content,
      referenceCounter: args[1].content,
      unnumbered,
    };
  }

  throw new Error('theorem definition not supported');
}
