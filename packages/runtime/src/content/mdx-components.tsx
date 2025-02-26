import { JSX } from 'preact/jsx-runtime';

import { MathJax } from '../mdx-handlers/math';
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
