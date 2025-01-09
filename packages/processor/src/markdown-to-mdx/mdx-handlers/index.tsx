import { Options } from '../options';
import { MDXComponents } from 'mdx/types';
import { JSX } from 'preact/jsx-runtime';

import { MathJax } from './math';
import { Task } from './task/Task';

// import { Section } from './toc-highlight/section';

// let idx = 0;

export function createMDXComponents(options: Partial<Options>) {
  // const ctx = {}
  return (): MDXComponents => ({
    div: Div,
    code: Code,
    // TODO: remove sectionize and use the titles
    // section: Section,
  });
}

function Div(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const className = String(props.class || '');
  if (className.includes('task')) {
    return <Task {...props} />;
  } else {
    return <div {...props} />;
  }
}

function Code(props: JSX.HTMLAttributes<HTMLElement>) {
  const className = String(props.class || '');
  if (className.includes('language-math')) {
    // console.log('code language-math:', ++idx);
    return (
      <MathJax
        expr={props.children as string}
        className={className.replace('language-math', '').trim()}
      />
    );
  }
  return <code {...props} />;
}
