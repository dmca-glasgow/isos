import { Root } from 'hast';
import { visit } from 'unist-util-visit';

import { Context } from '../../markdown-to-mdx/context';
import { createHeadingCounter } from '../headings/heading-counter';
import { latexSectionToDepth } from '../headings/section-to-heading';
import { createTheoremCounter } from '../theorems-proofs/theorem-counter';
import { formatCount } from './format-count';

// Inject counts for numbered headings and theorems
// Doing this in hast so I have access to remarkRehype attributes

export function addCounts(ctx: Context) {
  return (tree: Root) => {
    const theoremCounter = createTheoremCounter();
    const headingCounter = createHeadingCounter();

    let headingDepth = 0;
    let newSection = false;

    // console.dir(tree, { depth: null });

    visit(tree, 'element', (node, idx, parent) => {
      if (node.tagName === 'span') {
        const className = node.properties.className;

        if (Array.isArray(className)) {
          if (className[0] === 'heading-count') {
            // Count headings

            if (className.includes('unnumbered')) {
              Object.assign(node, { type: 'text', value: '' });
            } else {
              headingDepth = Number(String(className[1]).slice(-1));
              headingCounter.increment(headingDepth);
              newSection = true;

              if (headingDepth < 2 || headingDepth > 4) {
                Object.assign(node, { type: 'text', value: '' });
              } else {
                const counts = headingCounter.getCounts(headingDepth);
                const value = formatCount(counts);

                const _id = node.properties['data-id'];
                if (_id) {
                  const ctxObj = ctx.theorems.section;
                  const id = String(_id);
                  const label = `${ctxObj.heading} ${value}`;
                  ctx.refMap[id] = { id, label };
                }

                Object.assign(node, {
                  properties: {
                    className: 'count',
                  },
                  children: [{ type: 'text', value }],
                });

                // add space after span.count
                if (parent) {
                  const nextIdx = (idx || 0) + 1;
                  parent.children.splice(nextIdx, 0, {
                    type: 'text',
                    value: ' ',
                  });
                }
              }
            }
          }

          if (
            className[0] === 'thm-count' ||
            className[0] === 'eq-count' ||
            className[0] === 'fig-count' ||
            className[0] === 'tbl-count' ||
            className[0] === 'lst-count'
          ) {
            // Count theorems

            const theoremName = String(className[1]);
            const ctxTheorem = ctx.theorems[theoremName];

            if (ctxTheorem) {
              const { referenceCounter, unnumbered } = ctxTheorem;
              const id = String(node.properties['data-id'] || '');
              let value = '';

              if (!unnumbered) {
                const countName = referenceCounter || theoremName;
                const countTheorem = ctx.theorems[countName];
                const { numberWithin } = countTheorem;
                const counts: number[] = [];

                if (numberWithin) {
                  const depth = latexSectionToDepth(numberWithin);

                  if (newSection && depth >= headingDepth) {
                    theoremCounter.reset(countName);
                    newSection = false;
                  }

                  const count = theoremCounter.increment(countName);
                  counts.push(...headingCounter.getCounts(depth), count);

                  // TODO: counterWithin
                  // } else if (counterWithin) {
                  //   const depth = latexSectionToDepth(counterWithin);

                  //   if (newSection && depth >= headingDepth) {
                  //     theoremCounter.reset(countName);
                  //     newSection = false;
                  //   }

                  //   const count = theoremCounter.increment(countName);
                  //   counts.push(...headingCounter.getCounts(depth), count);
                } else {
                  counts.push(theoremCounter.increment(countName));
                }

                const count = formatCount(counts);
                value = ` ${count}`;

                if (id) {
                  const label = `${ctxTheorem.heading} ${count}`;
                  ctx.refMap[id] = { id, label };
                }
              }

              if (className[0] === 'eq-count') {
                Object.assign(node, {
                  type: 'text',
                  value: `(${value.trim()})`,
                });
              } else {
                Object.assign(node, { type: 'text', value });
              }
            }
          }
        }
      }
    });
  };
}
