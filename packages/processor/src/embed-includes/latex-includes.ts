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
import { getDataUrl, supportedExtensions } from './images-to-context';

export async function embedLatexIncludes(ctx: Context) {
  const ast = await getLatexAst(ctx.content, ctx);
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

async function getLatexAst(input: string, ctx: Context) {
  const processor = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString)
    .use(embedIncludes, ctx);
  const parsed = processor.parse(input);
  const transformed = await processor.run(parsed);
  return transformed as Ast.Root;
}

function embedIncludes(ctx: Context) {
  return async (tree: Ast.Root) => {
    const dir = dirname(ctx.filePath);
    const imagePaths: string[] = [];
    const filePaths: string[] = [];

    visit(tree, (node) => {
      if (node.type === 'macro' && node.content === 'includegraphics') {
        const args = getArgsContent(node as Ast.Macro);
        const filePath = printRaw(args[args.length - 1] || []);
        const fullPath = resolve(dir, filePath);
        ctx.subFilePaths.push(fullPath);
        imagePaths.push(fullPath);
      }

      if (
        node.type === 'macro' &&
        ['input', 'include'].includes(node.content)
      ) {
        const args = getArgsContent(node as Ast.Macro);
        const filePath = printRaw(args[args.length - 1] || []);
        const fullPath = resolve(dir, filePath);
        ctx.subFilePaths.push(fullPath);
        filePaths.push(fullPath);
      }
    });

    const contents: Ast.Root[] = [];
    for (const filePath of filePaths) {
      const content = await readTextFile(filePath);
      const ast = await getLatexAst(content, ctx);
      contents.push(ast);
    }

    for (const imagePath of imagePaths) {
      const ext = extname(imagePath);
      if (supportedExtensions.includes(ext)) {
        ctx.base64Images[imagePath] = await getDataUrl(imagePath, ext);
      }
    }

    let contentsIdx = 0;
    visit(tree, (node, info) => {
      if (
        node.type === 'macro' &&
        ['input', 'include'].includes(node.content)
      ) {
        const idx = info.index || 0;
        const parent = info.parents[0] as Ast.Environment;
        const ast = contents[contentsIdx];
        parent.content.splice(idx, 1, ...ast.content);
        contentsIdx++;
      }
    });
  };
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
