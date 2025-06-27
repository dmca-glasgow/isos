import { Image, Root } from 'mdast';
import { dirname, extname, resolve } from 'pathe';
import { visit } from 'unist-util-visit';

import { Context } from '../../input-to-markdown/context';
import { Options } from '../../input-to-markdown/options';

const supportedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

export function inlineImagesFromContext(ctx: Context, options: Options) {
  return async (tree: Root) => {
    // console.log(ctx);
    // console.log('inlineImages', options.noInlineImages);
    if (options.noInlineImages) {
      return;
    }
    const nodes: Image[] = [];

    visit(tree, 'image', (node) => {
      nodes.push(node);
    });

    const dir = dirname(ctx.filePath);

    for (const node of nodes) {
      const imagePath = resolve(dir, node.url);
      const ext = extname(imagePath);
      if (supportedExtensions.includes(ext)) {
        if (ctx.base64Images[imagePath]) {
          node.url = ctx.base64Images[imagePath];
        }
      } else {
        Object.assign(node, {
          type: 'textDirective',
          name: 'warn',
          children: [
            {
              type: 'text',
              value: `Unsupported image extension: ${ext || '(none)'}`,
            },
          ],
        });
      }
    }
  };
}
