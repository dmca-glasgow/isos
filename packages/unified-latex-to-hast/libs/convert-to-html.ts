import { processLatexViaUnified } from '@unified-latex/unified-latex';
import * as Ast from '@unified-latex/unified-latex-types';
import rehypeStringify from 'rehype-stringify';

import {
  PluginOptions,
  unifiedLatexToHast,
} from './unified-latex-plugin-to-hast';

const _processor = processLatexViaUnified()
  // @ts-expect-error
  .use(unifiedLatexToHast)
  // @ts-expect-error
  .use(rehypeStringify);

/**
 * Convert the `unified-latex` AST `tree` into an HTML string. If you need
 * more precise control or further processing, consider using `unified`
 * directly with the `unifiedLatexToHast` plugin.
 *
 * For example,
 * ```
 * unified()
 *      .use(unifiedLatexFromString)
 *      .use(unifiedLatexToHast)
 *      .use(rehypeStringify)
 *      .processSync("\\LaTeX to convert")
 * ```
 */
export function convertToHtml(
  tree: Ast.Node | Ast.Node[],
  options?: PluginOptions,
): string {
  let processor = _processor;
  if (!Array.isArray(tree) && tree.type !== 'root') {
    tree = { type: 'root', content: [tree] };
  }
  if (Array.isArray(tree)) {
    tree = { type: 'root', content: tree };
  }

  if (options) {
    // @ts-expect-error
    processor = _processor.use(unifiedLatexToHast, options);
  }

  const hast = processor.runSync(tree);
  // @ts-expect-error
  return processor.stringify(hast);
}
