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
      const { mime, url } = await getFile(imagePath, ext);

      if (mime !== null) {
        node.url = toBase64(url, mime);
      }
    }
  };
}

async function getFile(imagePath: string, ext: string) {
  const mime = mimes.getType(ext);
  switch (ext) {
    case '.pdf':
      const svg = await pdfToSvg(await readBinaryFile(imagePath));
      return {
        mime: mimes.getType('.svg'),
        url: Buffer.from(svg),
      };
    default:
      return {
        mime,
        url: await readBinaryFile(imagePath),
      };
  }
}

function toBase64(img: Uint8Array<ArrayBufferLike>, mime: string) {
  const base64 = btoa(String.fromCharCode(...img));
  return 'data:' + mime + ';base64,' + base64;
}
