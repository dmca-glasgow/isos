import { Image, Root } from 'mdast';
import { dirname, resolve } from 'pathe';
import { visit } from 'unist-util-visit';

import { Context } from '../../input-to-markdown/context';
import { Options } from '../../input-to-markdown/options';

// const supportedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

export function inlineImagesFromContext(ctx: Context, options: Options) {
  return async (tree: Root) => {
    // console.log(ctx.base64Images);
    // console.log('inlineImages', options.noInlineImages);
    if (options.noInlineImages) {
      return;
    }
    const nodes: Image[] = [];

    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node) => {
      // console.log(parent?.type);
      nodes.push(node);
    });

    const dir = dirname(ctx.filePath);

    for (const node of nodes) {
      const imagePath = resolve(dir, node.url);

      if (node.url.startsWith('data')) {
        // already inlined
        continue;
      }

      if (ctx.base64Images[imagePath]) {
        const { error, data } = ctx.base64Images[imagePath];
        if (!error) {
          node.url = data;
        } else {
          Object.assign(node, {
            type: 'textDirective',
            name: 'warn',
            children: [
              {
                type: 'text',
                value: data,
              },
            ],
          });
        }
      }
    }
  };
}
