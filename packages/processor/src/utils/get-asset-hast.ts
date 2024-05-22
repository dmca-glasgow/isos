import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';

import { Element, Parent } from 'hast';
import { toVFile } from 'to-vfile';

const rehypeParser = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeStringify);

export function getAssetHast(value: string) {
  const vfile = toVFile({ value });
  const parsed = rehypeParser().parse(vfile) as Parent;
  return parsed.children[0] as Element;
}
