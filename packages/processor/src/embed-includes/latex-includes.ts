import * as Ast from '@unified-latex/unified-latex-types';
import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
import { unifiedLatexFromString } from '@unified-latex/unified-latex-util-parse';
import { unifiedLatexStringCompiler } from '@unified-latex/unified-latex-util-to-string';
import { visit } from '@unified-latex/unified-latex-util-visit';
import { dirname, parse, resolve } from 'pathe';
import { unified } from 'unified';

import { Fs } from '@isos/fs/types';
import { printRaw } from '@isos/unified-latex-util-print-raw';

import { Context } from '../input-to-markdown/context';

export async function embedLatexIncludes(ctx: Context, fs: Fs) {
  const subFiles: string[] = [];
  const latexAstRoot = await getLatexAst(ctx.content, fs, ctx, subFiles);

  // start remove
  const processor = unified()
    // @ts-expect-error
    .use(unifiedLatexStringCompiler, {
      pretty: true,
      useTabs: true,
      // forceNewlineEnding: true,
      printWidth: 200,
    });

  ctx.content = String(processor.stringify(latexAstRoot));
  // end remove

  return { latexAstRoot, subFiles };
}

async function getLatexAst(
  input: string,
  fs: Fs,
  ctx: Context,
  subFiles: string[],
) {
  const processor = unified()
    // @ts-expect-error
    .use(unifiedLatexFromString)
    .use(recursivelyIncludeFiles, ctx, fs, subFiles);
  const parsed = processor.parse(input);
  const transformed = await processor.run(parsed);

  return transformed as Ast.Root;
}

function recursivelyIncludeFiles(
  ctx: Context,
  fs: Fs,
  subFiles: string[],
) {
  return async (tree: Ast.Root) => {
    const dir = dirname(ctx.srcFilePath);
    const includePaths: string[] = [];

    visit(tree, (node) => {
      if (node.type === 'macro') {
        if (isInclude(node)) {
          const fullPath = getFullPath(node, dir);
          includePaths.push(fullPath);
          subFiles.push(fullPath);
        }
        if (isImage(node)) {
          // default to .pdf if no extension given
          const fullPath = getFullPath(node, dir);
          const { name, ext } = parse(fullPath);
          const filePath = `${dir}/${name}${ext || '.pdf'}`;
          subFiles.push(filePath);
        }
      }
    });

    const contents: Record<string, Ast.Root | null> = {};

    for (const includePath of includePaths) {
      try {
        // the recursive bit
        contents[includePath] = await getLatexAst(
          await fs.readTextFile(includePath),
          fs,
          ctx,
          subFiles,
        );
      } catch (err) {
        contents[includePath] = null;
      }
    }

    visit(tree, (node, info) => {
      if (node.type === 'macro' && isInclude(node)) {
        const filePath = getFullPath(node, dir);
        const ast = contents[filePath];
        if (ast) {
          const idx = info.index || 0;
          const parent = info.parents[0] as Ast.Environment;
          parent.content.splice(idx, 1, ...ast.content);
        } else {
          // TODO: add warning element
        }
      }
    });
  };
}

function isInclude(node: Ast.Macro) {
  return ['input', 'include'].includes(node.content);
}

function isImage(node: Ast.Macro) {
  return ['includegraphics'].includes(node.content);
}

function getFullPath(node: Ast.Macro, dir: string) {
  const args = getArgsContent(node as Ast.Macro);
  const filePath = printRaw(args[args.length - 1] || []);
  return resolve(dir, filePath);
}
