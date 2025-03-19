import { signal } from '@preact/signals';

import { MathsOptions } from './maths/Maths';

export type MdxState = {
  maths: MathsOptions;
};

export function createMdxState(): MdxState {
  return {
    maths: {
      mathsAsTex: signal(false),
      mathsFontName: signal('termes'),
      syntaxHighlight: signal(true),
    },
  };
}
