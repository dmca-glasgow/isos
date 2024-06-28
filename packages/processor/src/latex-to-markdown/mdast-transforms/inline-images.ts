import { Options } from '../options';
import { Image, Root } from 'mdast';
import mimes from 'mime/lite';
import { dirname, extname, resolve } from 'pathe';
import { visit } from 'unist-util-visit';

import { readBinaryFile } from '@isos/fs';

import { Context } from '../context';

export function inlineImages(ctx: Context, options: Options) {
  return async (tree: Root) => {
    if (options.noInlineImages) {
      return;
    }
    const dir = dirname(ctx.filePath);
    const nodes: Image[] = [];

    visit(tree, 'image', (node) => {
      nodes.push(node);
    });

    for (const node of nodes) {
      const imagePath = resolve(dir, node.url);
      const mime = mimes.getType(extname(imagePath));
      const img = await readBinaryFile(imagePath);
      const base64 = btoa(String.fromCharCode(...img));
      node.url = 'data:' + mime + ';base64,' + base64;
    }
  };
}