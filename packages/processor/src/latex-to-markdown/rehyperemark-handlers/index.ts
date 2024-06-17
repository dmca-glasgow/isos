import { createHeadings } from './headings';
import { createInlineMaths, createMaths } from './maths';
import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { PhrasingContent } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';

import { boxoutAllowList } from '../../shared-utils/boxout-allow-list';
import { createEnvironment } from './environment';
import { createFancySection } from './fancysection';
import { createFramed } from './framed';
import { createLabel } from './label';
import { createReference } from './reference';
import { createSideNote } from './sidenote';
import { createTitle } from './title';

// import { createUnderline } from './underline';

export const handlers = {
  h1: headingHandler,
  h2: headingHandler,
  h3: headingHandler,
  h4: headingHandler,
  h5: headingHandler,
  h6: headingHandler,

  span: spanHandler,
  div: divHandler,
  center: centerHandler,
  // img: imgHandler,
};

function headingHandler(state: State, node: Element) {
  const result = createHeadings(state, node);
  state.patch(node, result);
  return result;
}

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
        state.patch(node, result);
        return result;
      }
    }
  }

  return state.all(node);
}

function centerHandler(state: State, node: Element): ContainerDirective {
  return {
    type: 'containerDirective',
    name: 'center',
    children: [
      {
        type: 'paragraph',
        children: state.all(node) as PhrasingContent[],
      },
    ],
  };
}
