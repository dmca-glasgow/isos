import { Element } from 'hast';
import { toMdast } from 'hast-util-to-mdast';
import { TextDirective } from 'mdast-util-directive';
import { toString } from 'mdast-util-to-string';

export function createWarn(
  node: Element,
  type: string,
  name: string,
): TextDirective {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`unhandled ${type}:`, name);
  }
  return {
    type: 'textDirective',
    name: 'warn',
    children: [
      {
        type: 'strong',
        children: [
          {
            type: 'text',
            value: `unhandled ${type}: ${name}`,
          },
        ],
      },
      {
        type: 'text',
        value: ' ',
      },
      {
        type: 'inlineCode',
        value: toString(toMdast(node)),
      },
    ],
  };
}
