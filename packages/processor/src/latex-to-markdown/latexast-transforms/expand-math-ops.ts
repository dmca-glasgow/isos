import { expandMacrosExcludingDefinitions } from '@unified-latex/unified-latex-util-macros';
import * as Ast from '@unified-latex/unified-latex-types';
import { attachMacroArgs } from '@unified-latex/unified-latex-util-arguments';
import { replaceNode } from '@unified-latex/unified-latex-util-replace';
import { match } from '@unified-latex/unified-latex-util-match';
import { visit } from '@unified-latex/unified-latex-util-visit';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';

type MathOpSpec = {
  name: string;
  signature: string;
  body: Ast.Node[];
  definition: Ast.Macro;
};

export function expandMathOperatorPlugin() {
  return (tree: Ast.Root) => {
    // console.dir(tree, { depth: null });
    const mathOps = listMathOps(tree);

    const macroInfo = Object.fromEntries(
      mathOps.map((m) => [m.name, { signature: m.signature }])
    );

    // We need to attach the arguments to each macro before we process it!
    attachMacroArgs(tree, macroInfo);
    // We want to expand all macros, except ones mentioned in actual `\newcommand` commands.
    expandMacrosExcludingDefinitions(tree, mathOps);

    // Finally, let's remove the `\newcommand`s from the tree.
    // Our document could have used `\newcommand` or `\NewDocumentCommand`, etc. We will remove
    // all of these.
    const mathOpsUsed = Object.fromEntries(
      mathOps.map((x) => [x.definition.content, true])
    );
    replaceNode(tree, (node) => {
      if (match.anyMacro(node) && mathOpsUsed[node.content]) {
        return null;
      }
    });
  };
}

function listMathOps(tree: Ast.Ast): MathOpSpec[] {
  const ret: MathOpSpec[] = [];
  visit(
    tree,
    (node) => {
      const name = macroToName(node);
      const signature = macroToSpec(node);
      const body = macroToSubstitutionAst(node);

      ret.push({ name, signature, body, definition: node });
    },
    { test: mathOpsMatcher }
  );
  return ret;
}

const mathOpsMatcher = match.createMacroMatcher(['DeclareMathOperator']);

function macroToName(node: Ast.Macro): string {
  if (!node.args?.length) {
    return '';
  }
  const definedName = node.args[1]?.content[0];
  if (!definedName) {
    console.warn('Could not find macro name defined in', node);
    return '';
  }
  return normalizeCommandName(printRaw(node.args[1].content));
}

function macroToSpec(node: Ast.Macro): string {
  if (!node.args?.length) {
    console.warn(
      `Found a '\\DeclareMathOperator' macro that doesn't have any args`,
      node
    );
    return '';
  }
  return printRaw(node.args[0]?.content).trim();
}

function macroToSubstitutionAst(node: Ast.Macro): Ast.Node[] {
  if (!node.args?.length) {
    return [];
  }
  return node.args[2]?.content || [];
}

function normalizeCommandName(str: string): string {
  str = str.trim();
  return str.startsWith('\\') ? str.slice(1) : str;
}
