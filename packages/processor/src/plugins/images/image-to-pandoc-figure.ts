import { Root } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import strip from 'strip-markdown';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { Context } from '../../input-to-markdown/context';
import { serialiseAttributes } from './formatted-caption';

export function imageToPandocFigure(_ctx: Context) {
  return (tree: Root) => {
    // console.log(ctx.base64Images);
    // console.log('imageToPandocFigure');
    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node, idx, parent) => {
      // console.log(node);
      const children = parent?.children || [];
      const data = (node.data || {}) as Record<string, string>;
      const attrs: Record<string, string> = {
        alt: getText(node.alt),
        caption: node.title || '',
        ...data,
      };
      const attributes = serialiseAttributes(attrs);
      // const hasImage = getImage(ctx, node.url);
      if (attributes) {
        const nextIdx = (idx || 0) + 1;
        children.splice(nextIdx, 0, {
          type: 'inlineCode',
          value: attributes,
        });
        node.alt = null;
        node.title = null;
      }
    });
    // console.dir(tree, { depth: null });
  };
}

function getText(markdown?: string | null) {
  if (!markdown) return '';

  const processor = unified()
    .use(remarkParse)
    .use(strip)
    .use(remarkStringify);

  return String(processor.processSync(markdown)).trim();
}

// function getImage(ctx: Context, name: string) {
//   if (process.env.NODE_ENV === 'test') {
//     return true;
//   }
//   const image = Object.entries(ctx.base64Images).find(([imagePath]) =>
//     imagePath.endsWith(name),
//   );
//   return image && !image[1].error;
// }
