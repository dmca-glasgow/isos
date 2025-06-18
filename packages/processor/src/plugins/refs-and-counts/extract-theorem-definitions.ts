import {
  Argument,
  Macro,
  Root,
  String,
} from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { visit } from '@unified-latex/unified-latex-util-visit';

import { Context } from '../../input-to-markdown/context';
import { Theorem } from '../theorems-proofs/default-theorems';
import { createDefaultObjectsYaml } from './default-objects';

export function extractTheoremDefinitions(ctx: Context) {
  return (tree: Root) => {
    let style: Theorem['style'] = 'plain';
    let theorems = createDefaultObjectsYaml();

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
            type: 'theorem',
          },
        };
      }

      if (node.type === 'macro' && node.content === 'counterwithin') {
        const args = getArgsContent(node);
        if (args[0] !== null && args[1] !== null) {
          const [name] = args[0];
          const [counterWithin] = args[1];
          if (name.type === 'string' && counterWithin.type === 'string') {
            theorems = {
              ...theorems,
              [name.content]: {
                ...(theorems[name.content] || {}),
                counterWithin: counterWithin.content,
              },
            };
          }
        }
      }
    });
    ctx.frontmatter.theorems = theorems;

    // console.log('extractTheoremDefinitions', ctx.frontmatter.theorems);
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
