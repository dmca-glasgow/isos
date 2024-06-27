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

export function insertParbreaksAroundBlockElements() {
  return (tree: Root) => {
    visit(tree, (node, info) => {
      if (shouldGetParbreaks(node)) {
        const parent = (info.parents[0] || {}) as Root;
        const children = parent.content || [];
        parent.content = children.reduce((acc: Node[], child, idx) => {
          if (
            idx > 0 &&
            shouldGetParbreaks(child) &&
            !isParBreak(children[idx - 1])
          ) {
            acc.push(parbreak, parbreak);
          }
          acc.push(child);
          if (
            idx < children.length - 1 &&
            shouldGetParbreaks(child) &&
            !isParBreak(children[idx + 1])
          ) {
            acc.push(parbreak, parbreak);
          }
          return acc;
        }, []);
      }
    });
  };
}

function shouldGetParbreaks(node: Node | Argument) {
  return isDisplayMath(node) || isEnumerate(node) || isItemize(node);
}

function isDisplayMath(node: Node | Argument) {
  return node.type === 'displaymath' || node.type === 'mathenv';
}

function isEnumerate(node: Node | Argument) {
  return node.type === 'environment' && node.env === 'enumerate';
}

function isItemize(node: Node | Argument) {
  return node.type === 'environment' && node.env === 'itemize';
}

function isParBreak(node?: Node) {
  return node?.type === 'parbreak';
}
