import { RunOptions } from '@mdx-js/mdx';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

export const defaultRunOptions: RunOptions = {
  Fragment,
  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};
