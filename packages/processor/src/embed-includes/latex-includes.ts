import * as Ast from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { unifiedLatexFromString } from '@unified-latex/unified-latex-util-parse';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { unifiedLatexStringCompiler } from '@unified-latex/unified-latex-util-to-string';
import { visit } from '@unified-latex/unified-latex-util-visit';
import { dirname, extname, resolve } from 'pathe';
import { unified } from 'unified';

import { readTextFile } from '@isos/fs';

import { Context } from '../input-to-markdown/context';
import { Options } from '../input-to-markdown/options';
import { getDataUrl, supportedExtensions } from './inline-image';

export async function embedLatexIncludes(ctx: Context, options: Options) {
  const ast = await getLatexAst(ctx.content, ctx, options);
  const processor = unified()
    // @ts-expect-error
    .use(unifiedLatexStringCompiler, {
      pretty: true,
      useTabs: true,
      // forceNewlineEnding: true,
      printWidth: 200,
    });

  ctx.content = String(processor.stringify(ast));
}

// TODO: rework this section to:
// * first get all the included image paths recursively
// * check those files exist
// * allow for injection of test files using `options.withFiles`
// * paste files into the document recursively

async function getLatexAst(input: string, ctx: Context, options: Options) {
  const processor = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString)
    .use(embedIncludes, ctx, options);
  const parsed = processor.parse(input);
  const transformed = await processor.run(parsed);
  return transformed as Ast.Root;
}

function embedIncludes(ctx: Context, options: Options) {
  return async (tree: Ast.Root) => {
    const dir = dirname(ctx.filePath);
    const imagePaths: string[] = [];
    const filePaths: string[] = [];

    visit(tree, (node) => {
      if (node.type === 'macro') {
        if (node.content === 'includegraphics') {
          imagePaths.push(getFullPath(node, dir));
        }

        if (['input', 'include'].includes(node.content)) {
          filePaths.push(getFullPath(node, dir));
          // ctx.subFilePaths.push(fullPath);
        }
      }
    });

    if (!options.noInlineImages) {
      for (const imagePath of imagePaths) {
        const ext = extname(imagePath);
        if (supportedExtensions.includes(ext)) {
          ctx.base64Images[imagePath] = await getDataUrl(imagePath, ext);
        }
      }
    }

    const contents: Record<string, Ast.Root> = {};

    for (const filePath of filePaths) {
      const content = await readFileContents(filePath);
      if (content !== null) {
        const ast = await getLatexAst(content, ctx, options);
        contents[filePath] = ast;
      }
    }

    visit(tree, (node, info) => {
      if (
        node.type === 'macro' &&
        ['input', 'include'].includes(node.content)
      ) {
        const fullPath = getFullPath(node, dir);
        const ast = contents[fullPath] || { content: [] };

        const idx = info.index || 0;
        const parent = info.parents[0] as Ast.Environment;
        parent.content.splice(idx, 1, ...ast.content);
      }
    });
  };
}

function getFullPath(node: Ast.Macro, dir: string) {
  const args = getArgsContent(node as Ast.Macro);
  const filePath = printRaw(args[args.length - 1] || []);
  return resolve(dir, filePath);
}

async function readFileContents(filePath: string): Promise<string | null> {
  try {
    return await readTextFile(filePath);
  } catch (err: any) {
    console.log('[read file]:', err);
    return null;
  }
}

// export async function embedLatexIncludes(input: string, ctx: Context) {
//   const lines = input.split('\n');

//   for (let idx = 0; idx < lines.length; idx++) {
//     const line = lines[idx];
//     const match = line.match(
//       /^\\(input|include|includegraphics)(.*){(.+)}$/,
//     );
//     if (match !== null) {
//       const fullPath = resolve(dirname(ctx.filePath), match[3]);
//       subFiles.push(fullPath);
//       const contents = await readTextFile(fullPath);
//       lines[idx] = await embedLatexIncludes(contents.trim(), ctx);
//     }
//   }

//   return lines.join('\n');
// }
