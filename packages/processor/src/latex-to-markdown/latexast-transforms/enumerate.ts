import {
  Argument,
  Node,
  Parbreak,
  Root,
} from '@unified-latex/unified-latex-types';
import { visit } from '@unified-latex/unified-latex-util-visit';

const parbreak: Parbreak = {
  type: 'parbreak',
};

export function insertParbreaksAroundEnumerate() {
  return (tree: Root) => {
    visit(tree, (node, info) => {
      if (isEnumerate(node)) {
        const parent = (info.parents[0] || {}) as Root;
        const children = parent.content || [];

        parent.content = children.reduce((acc: Node[], child, idx) => {
          const siblingBefore = (children[idx - 1] || {}) as Node;
          const siblingAfter = (children[idx + 1] || {}) as Node;
          if (
            idx > 0 &&
            isEnumerate(child) &&
            !isParBreak(siblingBefore)
          ) {
            acc.push(parbreak, parbreak);
          }
          acc.push(child);
          if (
            idx < children.length - 1 &&
            isEnumerate(child) &&
            !isParBreak(siblingAfter)
          ) {
            acc.push(parbreak, parbreak);
          }
          return acc;
        }, []);
      }
    });
  };
}

function isEnumerate(node: Node | Argument) {
  return node.type === 'environment' && node.env === 'enumerate';
}

function isParBreak(node: Node) {
  return node.type === 'parbreak';
}
