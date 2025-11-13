import { Root } from 'mdast';
import { dirname, resolve } from 'pathe';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { Fs } from '@isos/fs/types';

import { Context } from '../input-to-markdown/context';

export async function embedMarkdownIncludes(ctx: Context, fs: Fs) {
  const subFiles: string[] = [];

  ctx.content = await recursivelyIncludeFiles(
    ctx.content,
    fs,
    ctx,
    subFiles,
  );

  const processor = unified()
    .use(remarkParse)
    .use(collectImages, ctx, subFiles);
  const parsed = processor.parse(ctx.content);
  const mdAstRoot = (await processor.run(parsed)) as Root;

  return { mdAstRoot, subFiles };
}

async function recursivelyIncludeFiles(
  input: string,
  fs: Fs,
  ctx: Context,
  subFiles: string[],
) {
  const dir = dirname(ctx.srcFilePath);
  const lines = input.split('\n');

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const match = line.match(/^{{<\s+include\s+([\s\S]+?)\s+>}}\s*$/);

    if (match !== null) {
      const fullPath = resolve(dir, match[1]);
      subFiles.push(fullPath);
      const contents = await fs.readTextFile(fullPath);
      lines[idx] = await recursivelyIncludeFiles(
        contents.trim(),
        fs,
        ctx,
        subFiles,
      );
    }
  }

  return lines.join('\n');
}

function collectImages(ctx: Context, subFiles: string[]) {
  return (tree: Root) => {
    const dir = dirname(ctx.srcFilePath);
    visit(tree, 'image', (node) => {
      const imagePath = resolve(dir, node.url);
      subFiles.push(imagePath);
    });
  };
}
