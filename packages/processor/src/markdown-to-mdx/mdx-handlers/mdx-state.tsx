import { signal } from '@preact/signals';

import {
  MathsFont,
  MathsOptions,
} from '../../plugins/maths/mdx-handlers/Maths';

export type MdxState = {
  maths: MathsOptions;
};

export type MdxDefaultState = {
  maths: {
    mathsAsTex: boolean;
    mathsFontName: MathsFont;
    syntaxHighlight: boolean;
  };
};

const defaultState: MdxDefaultState = {
  maths: {
    mathsAsTex: false,
    mathsFontName: 'termes' as MathsFont,
    syntaxHighlight: true,
  },
};

export function createMdxState(): MdxState {
  return {
    maths: {
      mathsAsTex: signal(defaultState.maths.mathsAsTex),
      mathsFontName: signal(defaultState.maths.mathsFontName),
      syntaxHighlight: signal(defaultState.maths.syntaxHighlight),
    },
  };
}
