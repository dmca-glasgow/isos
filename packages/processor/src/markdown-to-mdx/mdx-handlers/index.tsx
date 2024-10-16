// import { MathJax } from 'better-react-mathjax';
import { MDXComponents } from 'mdx/types';

import { Task } from './task/Task';

export function useMDXComponents(): MDXComponents {
  // const ctx = {}
  return {
    div(props) {
      if (props.class?.includes('task')) {
        return <Task {...props} />;
      }
      return <div {...props} />;
    },
    // code(props) {
    //   if (props.class?.includes('math-inline')) {
    //     return <MathJax {...props} />;
    //   }
    //   return <code {...props} />;
    // },
  };
}
