import { Root as HastRoot } from 'hast';
import { Root as MdAstRoot } from 'mdast';
import { Literal } from 'unist';
import { visit } from 'unist-util-visit';

export function endashEmdashToDashes() {
  return (tree: HastRoot) => {
    visit(tree, 'text', (node: Literal) => {
      node.value = String(node.value || '')
        .replace(/—/g, '---')
        .replace(/–/g, '--');
    });
  };
}

export function dashesToEndashEmdash() {
  return (tree: MdAstRoot) => {
    visit(tree, 'text', (node: Literal) => {
      node.value = String(node.value || '')
        .replace(/-{3}/g, '—')
        .replace(/-{2}/g, '–');
    });
  };
}
