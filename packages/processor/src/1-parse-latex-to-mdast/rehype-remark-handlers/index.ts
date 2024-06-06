import { createInlineMaths, createMaths } from './maths';
import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { Heading } from 'mdast';

import { boxoutAllowList } from '../../utils/boxout-allow-list';
import { createAnchorLink } from './anchor-link';
import { createEnvironment } from './environment';
import { createLabel } from './label';
import { createSideNote } from './sidenote';
import { createTitle } from './title';

export const handlers = {
  span: spanHandler,
  div: divHandler,
};

function spanHandler(state: State, node: Element) {
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
      const result = createAnchorLink(state, node);
      state.patch(node, result);
      return result;
    }

    if (className.includes('macro-label')) {
      const result = createLabel(state, node);
      state.patch(node, result);
      return result;
    }
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
    }
  }

  return state.all(node);
}
