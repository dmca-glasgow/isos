import { readBinaryFile } from '@tauri-apps/api/fs';
import { dirname, extname, resolve } from '@tauri-apps/api/path';
import { Image, Root } from 'mdast';
import mimes from 'mime/lite';
import { visit } from 'unist-util-visit';

import { Context } from '../context';

export function inlineImages(ctx: Context) {
  return async (tree: Root) => {
    const dir = await dirname(ctx.filePath);
    const nodes: Image[] = [];

    visit(tree, 'image', (node) => {
      nodes.push(node);
    });

    for (const node of nodes) {
      const imagePath = await resolve(dir, node.url);
      const mime = mimes.getType(await extname(imagePath));
      const img = await readBinaryFile(imagePath);
      const base64 = await arrayBufferToBase64(img);
      node.url = 'data:' + mime + ';base64,' + base64;
    }
  };
}

function arrayBufferToBase64(buffer) {
  return new Promise((resolve) => {
    const blob = new Blob([buffer], {
      type: 'application/octet-binary',
    });
    const reader = new FileReader();
    reader.onload = function (evt) {
      const dataurl = evt.target.result;
      resolve(dataurl.substr(dataurl.indexOf(',') + 1));
    };
    reader.readAsDataURL(blob);
  });
}
