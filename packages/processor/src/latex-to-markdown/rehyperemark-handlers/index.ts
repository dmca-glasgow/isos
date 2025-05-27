import { Element, Parents } from 'hast';
import { Handle, State } from 'hast-util-to-mdast';

import { displayQuoteToBlockQuote } from '../../plugins/blockquote';
import { rehypeRemarkPre } from '../../plugins/code/rehype-remark-pre';
import { defListHastToMdast } from '../../plugins/definition-list';
import {
  createFootnote,
  createFootnoteMark,
  createFootnoteText,
} from '../../plugins/footnotes/footnote';
// import { createFramed } from './framed';
import { createHeadings } from '../../plugins/headings/headings';
import { createInlineMaths, createMaths } from '../../plugins/maths/maths';
import { createReference } from '../../plugins/refs-and-counts/reference';
import { rehypeRemarkDel } from '../../plugins/strikethrough/rehypre-remark-del';
import { superSubHandlers } from '../../plugins/super-sub';
import { defaultTheorems } from '../../plugins/theorems-proofs/default-theorems';
import { createTheorem } from '../../plugins/theorems-proofs/rehype-remark-theorem';
import { Context } from '../context';
// import { createFancySection, createFancyTitle } from './fancy';
import { createLabel } from './label';
import { createSideNote } from './sidenote';
import { createTitle } from './title';

// import { createUnderline } from './underline';

export function createRehypeRemarkHandlers(
  ctx: Context,
): Record<string, Handle> {
  return {
    ...defListHastToMdast,

    h1: headingHandler,
    h2: headingHandler,
    h3: headingHandler,
    h4: headingHandler,
    h5: headingHandler,
    h6: headingHandler,

    div: divHandler,
    span(state: State, node: Element) {
      return spanHandler(ctx, state, node);
    },

    sup: superSubHandlers.sup,
    sub: superSubHandlers.sub,
    pre: rehypeRemarkPre,
    del: rehypeRemarkDel,

    // table(state: State, node: Element) {
    //   console.log(node);
    //   return {
    //     type: 'table',
    //     align: node.align,
    //     children: state.all(node),
    //   };
    // },

    // center: centerHandler,
    // img: imgHandler,
  };
}

function headingHandler(state: State, node: Element) {
  const result = createHeadings(state, node);
  state.patch(node, result);
  return result;
}

function spanHandler(
  _ctx: Context,
  state: State,
  node: Element,
  parents?: Parents,
) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
    if (className.includes('inline-math')) {
      const result = createInlineMaths(node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-sidenote')) {
      const result = createSideNote(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-title')) {
      const result = createTitle(state, node);
      state.patch(node, result);
      return result;
    }

    // cleverref
    if (
      className.includes('macro-cref') ||
      className.includes('macro-autoref')
    ) {
      const result = createReference(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-label')) {
      const result = createLabel(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-footnote')) {
      const result = createFootnote(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-footnotemark')) {
      const result = createFootnoteMark(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-footnotetext')) {
      const result = createFootnoteText(state, node, parents);
      state.patch(node, result);
      return result;
    }

    // if (className.includes('macro-fancysection')) {
    //   const result = createFancySection(state, node);
    //   state.patch(node, result);
    //   return result;
    // }

    // if (className.includes('macro-fancytitle')) {
    //   const result = createFancyTitle(ctx);
    //   state.patch(node, result);
    //   return result;
    // }

    // if (className.includes('underline')) {
    //   const result = createUnderline(state, node);
    //   state.patch(node, result);
    //   return result;
    // }
  }

  return state.all(node);
}

function divHandler(state: State, node: Element) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
    if (className.includes('display-math')) {
      const result = createMaths(node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('theorem')) {
      const theoremType = String(className[className.length - 1]);
      if (defaultTheorems.find((o) => o.name === theoremType)) {
        const result = createTheorem(state, node, theoremType);
        state.patch(node, result);
        return result;
      }
    }

    if (className.includes('environment')) {
      const classes = className.filter((name) => name !== 'environment');
      const environmentName = String(classes[0]);

      if (environmentName === 'displayquote') {
        return displayQuoteToBlockQuote(state, node);
      }

      // console.log(node);

      // if (environmentName === 'framed') {
      //   const result = createFramed(state, node);
      //   // console.log(result);
      //   state.patch(node, result);
      //   // console.log(state);
      //   return result;
      // }
    }
  }

  return state.all(node);
}

// function centerHandler(state: State, node: Element) {
//   return [
//     {
//       type: 'text',
//       value: '\n\n',
//     },
//     {
//       type: 'containerDirective',
//       name: 'center',
//       children: [
//         {
//           type: 'paragraph',
//           children: state.all(node) as PhrasingContent[],
//         },
//       ],
//     },
//     {
//       type: 'text',
//       value: '\n\n',
//     },
//   ];
// }
