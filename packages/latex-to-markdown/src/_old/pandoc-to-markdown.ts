import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkDirective from 'remark-directive';
import { sideNote } from './sidenote';
import { Context } from './context';

export async function pandocToMarkdown(ctx: Context, markdown: string) {
  // console.log('pandocToMarkdown', md);

  const file = await unified()
    .use(remarkParse)
    .use(sideNote, ctx)
    .use(remarkDirective)
    .use(remarkStringify)
    .process(markdown);

  const result = String(file);
  // console.log('result', result);
  return result;
}
