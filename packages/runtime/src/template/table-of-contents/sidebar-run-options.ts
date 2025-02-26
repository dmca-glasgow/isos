import { RunOptions } from '@mdx-js/mdx';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { TocListItem } from '../../mdx-handlers/toc-highlight/toc-list-item';

export const sidebarRunOptions: RunOptions = {
  Fragment,
  useMDXComponents() {
    return {
      li: TocListItem,
    };
  },

  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};
