import { RunOptions } from '@mdx-js/mdx';
import { VNode } from 'preact';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';
import { JSX } from 'preact/jsx-runtime';

import { Maths } from './maths/Maths';
import { MdxState } from './mdx-state';
import { Task } from './task/Task';
import { Section } from './toc-highlight/section';
import { TocListItem } from './toc-highlight/toc-list-item';

export function createRunOptions({ maths }: MdxState): RunOptions {
  return {
    Fragment,
    useMDXComponents: () => ({
      div(props) {
        const className = String(props.class || '');
        if (className.includes('task')) {
          return <Task {...props} />;
        } else {
          return <div {...props} />;
        }
      },
      code(props) {
        const className = String(props.class || '');
        if (className.includes('math-inline')) {
          const expr = props.children as string;
          return <Maths expr={expr} format="inline" options={maths} />;
        } else {
          return <code {...props} />;
        }
      },
      pre(props) {
        const children = (props.children || {}) as VNode;
        const childProps = (children?.props ||
          {}) as JSX.HTMLAttributes<HTMLElement>;
        const className = String(childProps.class || '');

        if (className.includes('math-display')) {
          const expr = childProps.children as string;
          return (
            <p>
              <Maths expr={expr} format="display" options={maths} />
            </p>
          );
        }

        return <pre {...props} />;
      },
      section: Section,
    }),
    jsx,
    jsxs,
    jsxDEV,
  };
}

export function createSidebarRunOptions(_mdxState: MdxState): RunOptions {
  return {
    Fragment,
    jsx,
    jsxs,
    jsxDEV,
    useMDXComponents: () => ({
      li: TocListItem,
    }),
  };
}
