import { State } from 'hast-util-to-mdast';
import { Element } from 'hast';

import { createSideNote } from './sidenote';
import { createInlineMaths, createMaths } from './maths';
import { createTitle } from './title';

export const handlers = {
  span: customSpanHandler,
  div: customDivHandler,
};

function customSpanHandler(state: State, node: Element) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
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

    if (className.includes('inline-math')) {
      const result = createInlineMaths(node);
      state.patch(node, result);
      return result;
    }
  }

  return state.all(node);
}

function customDivHandler(state: State, node: Element) {
  const { className } = node.properties;

  if (Array.isArray(className)) {
    if (className.includes('display-math')) {
      const result = createMaths(node);
      state.patch(node, result);
      return result;
    }
  }

  return state.all(node);
}
