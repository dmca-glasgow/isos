import { RunOptions } from '@mdx-js/mdx';
import classNames from 'classnames';
import { VNode } from 'preact';
import { Fragment, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { CalloutIcon } from '../../plugins/callout/mdx-callout-icon';
// import { Authors } from '../../plugins/cover/mdx-authors';
import { OrcidLink } from '../../plugins/cover/orcid-link';
import { Maths } from '../../plugins/maths/mdx-handlers/Maths';
import { WarnSpan } from '../../plugins/warn/mdx-warn';
import { Options } from '../options';
import { MdxState } from './mdx-state';
import { Task } from './task/mdx-task';
import { Section } from './toc-highlight/section';
import { TocListItem } from './toc-highlight/toc-list-item';

export function createRunOptions(
  { maths }: MdxState,
  { noIcons }: Pick<Options, 'noIcons'>,
): RunOptions {
  return {
    Fragment,
    useMDXComponents: () => ({
      // TODO: not working with some tests
      a(props) {
        const href = String(props?.href || '');
        const className = String(props?.class || '');
        if (className === 'orcid') {
          return <OrcidLink {...props} />;
        } else if (href.startsWith('#')) {
          return <a {...props} />;
        } else {
          // this is to ensure external links open in your
          // default browser and not the tauri app window
          return <a {...props} target="_blank" />;
        }
      },
      // TODO: not working with some tests
      span(props) {
        const className = String(props.class || '');
        if (!noIcons && className.includes('callout-icon')) {
          return <CalloutIcon {...props} />;
        } else if (className.startsWith('warn')) {
          return <WarnSpan {...props} />;
        } else {
          return <span {...props} />;
        }
      },
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
        }

        // if (className.startsWith('language')) {
        //   const match = className.match(/language-(\S+)/);
        //   if (match !== null) {
        //     console.log('code:', match[1]);
        //     return <code>{props.children}</code>;
        //   }
        // }

        return <code {...props} />;
      },
      pre(props) {
        let children: VNode[] = [];
        if (Array.isArray(props.children)) {
          children = props.children;
        } else if (props.children?.props) {
          children.push(props.children);
        } else {
          children = [];
        }

        const child = children[0];
        const count = children[1];
        // @ts-expect-error
        const className = String(child.props?.class || '');

        // if (className.startsWith('language')) {
        //   const match = className.match(/language-(\S+)/);
        //   if (match !== null) {
        //     console.log('pre:', match[1]);
        //     return <pre>{children}</pre>;
        //   }
        // }

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
      // ul(props) {
      //   const className = String(props.class || '');
      //   if (className === 'authors') {
      //     return <Authors {...props} />;
      //   } else {
      //     return <ul {...props} />;
      //   }
      // },
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
