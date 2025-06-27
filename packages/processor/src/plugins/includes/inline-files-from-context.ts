// import * as Ast from '@unified-latex/unified-latex-types';
// import { getArgsContent } from '@unified-latex/unified-latex-util-arguments';
// import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
// import { visit } from '@unified-latex/unified-latex-util-visit';
// import { dirname, resolve } from 'pathe';

// import { Context } from '../../input-to-markdown/context';
// import { Options } from '../../input-to-markdown/options';

// export function inlineFilesFromContext(ctx: Context, _options: Options) {
//   return async (tree: Ast.Root) => {
//     const dir = dirname(ctx.filePath);
//     visit(tree, (node, info) => {
//       if (
//         node.type === 'macro' &&
//         ['input', 'include'].includes(node.content)
//       ) {
//         console.log(node);
//         // const fullPath = getFullPath(node, dir);
//         // const ast = contents[fullPath] || { content: [] };

//         // const idx = info.index || 0;
//         // const parent = info.parents[0] as Ast.Environment;
//         // parent.content.splice(idx, 1, ...ast.content);
//       }
//     });
//   };
// }

// function getFullPath(node: Ast.Macro, dir: string) {
//   const args = getArgsContent(node as Ast.Macro);
//   const filePath = printRaw(args[args.length - 1] || []);
//   return resolve(dir, filePath);
// }
