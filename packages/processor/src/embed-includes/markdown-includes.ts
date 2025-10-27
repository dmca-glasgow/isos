import { Image, Root } from 'mdast';
import { dirname, extname, resolve } from 'pathe';
// import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
// import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { readTextFile } from '@isos/fs';

import { Context } from '../input-to-markdown/context';
import { getDataUrl, supportedExtensions } from './inline-image';

export async function embedMarkdownIncludes(ctx: Context) {
  // console.log('embedMarkdownIncludes');
  await registerImages(ctx.content, ctx);
  ctx.content = await replaceLines(ctx.content, ctx);
}

async function replaceLines(input: string, ctx: Context) {
  const dir = dirname(ctx.filePath);
  const lines = input.split('\n');

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const match = line.match(/^{{<\s+include\s+([\s\S]+?)\s+>}}\s*$/);

    if (match !== null) {
      const fullPath = resolve(dir, match[1]);
      ctx.subFilePaths.push(fullPath);
      const contents = await readTextFile(fullPath);
      lines[idx] = await replaceLines(contents.trim(), ctx);
    }
  }

  return lines.join('\n');
}

async function registerImages(input: string, ctx: Context) {
  const processor = unified().use(remarkParse).use(embedIncludes, ctx);
  const parsed = processor.parse(input);
  const transformed = await processor.run(parsed);
  return transformed as Root;
}

function embedIncludes(ctx: Context) {
  return async (tree: Root) => {
    const nodes: Image[] = [];

    visit(tree, 'image', (node) => {
      nodes.push(node);
    });

    const dir = dirname(ctx.filePath);

    for (const node of nodes) {
      const imagePath = resolve(dir, node.url);
      ctx.subFilePaths.push(imagePath);

      const ext = extname(imagePath);
      if (supportedExtensions.includes(ext)) {
        ctx.base64Images[imagePath] = await getDataUrl(imagePath);
      }
    }
  };
}
