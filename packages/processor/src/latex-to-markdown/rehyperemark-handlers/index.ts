import { Element } from 'hast';
import { Handle, State } from 'hast-util-to-mdast';

import { displayQuoteToBlockQuote } from '../../plugins/blockquote';
import { rehypeRemarkPre } from '../../plugins/code/rehype-remark-pre';
import { rehypeRemarkDel } from '../../plugins/strikethrough/rehypre-remark-del';
import { superSubHandlers } from '../../plugins/super-sub';
import { boxoutAllowList } from '../../shared-utils/boxout-allow-list';
import { Context } from '../context';
import { createEnvironment } from './environment';
import { createFancySection, createFancyTitle } from './fancy';
import { createFramed } from './framed';
import { createHeadings } from './headings';
import { createLabel } from './label';
import { createInlineMaths, createMaths } from './maths';
import { createReference } from './reference';
import { createSideNote } from './sidenote';
import { createTitle } from './title';

// import { createUnderline } from './underline';

export function createRehypeRemarkHandlers(
  ctx: Context,
): Record<string, Handle> {
  return {
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
    // center: centerHandler,
    // img: imgHandler,
  };
}

function headingHandler(state: State, node: Element) {
  const result = createHeadings(state, node);
  state.patch(node, result);
  return result;
}

function spanHandler(ctx: Context, state: State, node: Element) {
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

    if (className.includes('macro-ref')) {
      const result = createReference(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-label')) {
      const result = createLabel(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-fancysection')) {
      const result = createFancySection(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-fancytitle')) {
      const result = createFancyTitle(ctx);
      state.patch(node, result);
      return result;
    }

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

    if (className.includes('environment')) {
      const classes = className.filter((name) => name !== 'environment');
      const environmentName = String(classes[0]);

      if (boxoutAllowList.includes(environmentName)) {
        const result = createEnvironment(state, node, environmentName);
        state.patch(node, result);
        return result;
      }

      if (environmentName === 'framed') {
        const result = createFramed(state, node);
        // console.log(result);
        state.patch(node, result);
        // console.log(state);
        return result;
      }

      if (environmentName === 'displayquote') {
        return displayQuoteToBlockQuote(state, node);
      }
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
