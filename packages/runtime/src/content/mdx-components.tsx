import { VNode } from 'preact';
import { JSX } from 'preact/jsx-runtime';

import { MathDisplay, MathInline } from '../mdx-handlers/math/Math';
import { Task } from '../mdx-handlers/task/Task';

export function Div(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const className = String(props.class || '');
  if (className.includes('task')) {
    return <Task {...props} />;
  } else {
    return <div {...props} />;
  }
}

export function Code(props: JSX.HTMLAttributes<HTMLElement>) {
  const className = String(props.class || '');

  if (className.includes('math-inline')) {
    return <MathInline expr={props.children as string} />;
  }

  return <code {...props} />;
}

export function Pre(props: JSX.HTMLAttributes<HTMLPreElement>) {
  const children = (props.children || {}) as VNode;
  const childProps = (children?.props ||
    {}) as JSX.HTMLAttributes<HTMLElement>;
  const className = String(childProps.class || '');

  if (className.includes('math-display')) {
    return <MathDisplay expr={childProps.children as string} />;
  }

  return <pre {...props} />;
}
