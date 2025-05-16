import { Image, Root } from 'mdast';
import mimes from 'mime/lite';
import { dirname, extname, resolve } from 'pathe';
import { visit } from 'unist-util-visit';

import { readBinaryFile } from '@isos/fs';
import { pdfToSvg } from '@isos/pdf-to-svg';

import { Context } from '../../latex-to-markdown/context';
import { Options } from '../../latex-to-markdown/options';

export function inlineImages(ctx: Context, options: Options) {
  return async (tree: Root) => {
    // console.log('inlineImages');
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
      if (ext !== '') {
        const mime = mimes.getType(ext);
        if (mime !== null) {
          node.url = await getDataUrl(imagePath, ext, mime);
        }
      }
    }
  };
}

async function getDataUrl(imagePath: string, ext: string, mime: string) {
  switch (ext) {
    case '.pdf': {
      const svg = await pdfToSvg(await readBinaryFile(imagePath));
      const base64 = btoa(svg);
      return 'data:' + mimes.getType('.svg') + ';base64,' + base64;
    }
    case '.jpg':
    case '.jpeg':
    case '.png': {
      const img = await readBinaryFile(imagePath);
      const base64 = btoa(String.fromCharCode(...img));
      return 'data:' + mime + ';base64,' + base64;
    }
    default:
      throw new Error(
        `[inline-images]: unsupported file extension "${ext}"`,
      );
  }
}
