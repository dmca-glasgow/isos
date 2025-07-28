import * as maths from '../../plugins/maths/mdx-state';

export type MdxDefaultState = {
  maths: maths.MathsStateType;
};

const initialState: MdxDefaultState = {
  maths: maths.mathsInitial,
};

export type MdxState = {
  maths: maths.MathsState;
};

export function createMdxState(): MdxState {
  return {
    maths: maths.mathsSignalState(initialState.maths),
  };
}
