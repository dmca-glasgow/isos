import { Root } from '@unified-latex/unified-latex-types';
import { parsePgfkeys as parse } from '@unified-latex/unified-latex-util-pgfkeys';

export function parsePgfKeys() {
  return (tree: Root) => {
    const items = parse(tree.content);
    console.dir(items, { depth: null });
  };
}
