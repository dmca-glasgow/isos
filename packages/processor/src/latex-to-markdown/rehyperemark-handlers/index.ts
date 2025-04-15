import { Element } from 'hast';
import { Handle, State, toMdast } from 'hast-util-to-mdast';

import { displayQuoteToBlockQuote } from '../../plugins/blockquote';
import { rehypeRemarkPre } from '../../plugins/code/rehype-remark-pre';
import { defListHastToMdast } from '../../plugins/definition-list';
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

    // td: cellHandler,
    // th: cellHandler,
    // center: centerHandler,
    // img: imgHandler,
  };
}

function cellHandler(state: State, node: Element) {
  // console.log(node);
  const style = String(node.properties.style || '');
  const match = style.match(/text-align:\s+([^;]+)/);
  // console.log({ style, match: match && match[1] });
  const mdast = toMdast({ type: 'root', children: node.children });
  const result = {
    type: 'tableCell',
    children: mdast.children,
  };
  if (match !== null) {
    result.properties = {
      align: match[1],
    };
  }
  return result;
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
