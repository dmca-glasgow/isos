import { RunOptions } from '@mdx-js/mdx';
import classNames from 'classnames';
import { VNode } from 'preact';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { Maths } from '../../plugins/maths/mdx-handlers/Maths';
// import { WarnSpan } from '../../plugins/warn/mdx-warn';
import { MdxState } from './mdx-state';
import { Task } from './task/mdx-task';
import { Section } from './toc-highlight/section';
import { TocListItem } from './toc-highlight/toc-list-item';

export function createRunOptions({ maths }: MdxState): RunOptions {
  return {
    Fragment,
    useMDXComponents: () => ({
      a(props) {
        // this is to ensure external links open in your
        // default browser and not the tauri app window
        const href = String(props?.href || '');
        if (href.startsWith('#')) {
          return <a {...props} />;
        } else {
          return <a {...props} target="_blank" />;
        }
      },
      // TODO: not working with some tests
      // span(props) {
      //   const className = String(props.class || '');
      //   if (className.startsWith('warn')) {
      //     return <WarnSpan {...props} />;
      //   } else {
      //     return <span {...props} />;
      //   }
      // },
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
        const _children = props.children;
        let children: VNode[] = [];
        if (Array.isArray(_children)) {
          children = _children;
        } else if (_children?.props) {
          children.push(_children);
        } else {
          children = [];
        }

        const child = children[0];
        const count = children[1];
        // @ts-expect-error
        const className = String(child.props?.class || '');

        if (className.includes('math-display')) {
          const id = props['data-id'];
          const expr = child.props.children as string;
          const className = classNames('maths', { 'env-equation': count });
          return (
            <p id={id} className={className}>
              <Maths expr={expr} format="display" options={maths} />
              {count}
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
