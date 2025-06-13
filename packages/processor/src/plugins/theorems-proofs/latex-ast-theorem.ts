import { Environment, Macro } from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { htmlLike } from '@unified-latex/unified-latex-util-html-like';
import { expandUnicodeLigatures } from '@unified-latex/unified-latex-util-ligatures';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';

import { Context } from '../../input-to-markdown/context';
import { defaultTheorems } from './default-theorems';

type Handlers = Record<string, (node: Environment) => Macro>;

export function createTheoremHandlers(_ctx: Context) {
  // console.log(ctx);
  return defaultTheorems.reduce((acc: Handlers, theorem) => {
    acc[theorem.name] = createTheorem;
    return acc;
  }, {});
}

// console.log(latexAstTheorems);

function createTheorem(node: Environment): Macro {
  const name = extractName(node);
  const attributes: {
    className: string[];
    name?: string;
  } = {
    className: ['theorem'],
  };

  if (node.env && node.env !== 'theorem') {
    attributes.className.push(node.env);
  }

  if (name.length) {
    attributes.name = name;
  }

  return htmlLike({
    tag: 'div',
    attributes,
    content: node.content,
  });
}

function extractName(node: Environment) {
  const args = getArgsContent(node);
  const arg = args[args.length - 1] || [];
  expandUnicodeLigatures(arg);
  const name = printRaw(arg).trim();
  if (name !== '') {
    return name;
  }

  // amsthm environments conjecture, exercise and solution are not set in:
  // https://github.com/siefkenj/unified-latex/blob/main/packages/unified-latex-ctan/package/mathtools/provides.ts#L209-L217

  const first = node.content[0];
  if (first && first.type === 'string' && first.content === '[') {
    const match = printRaw(node.content)
      .trim()
      .match(/^\[(.*)\]/);

    if (match !== null) {
      const idx = node.content.findIndex((o) => {
        return o.type === 'string' && o.content === ']';
      });
      node.content.splice(0, idx + 1);
      return match[1];
    }
  }

  return '';
}
