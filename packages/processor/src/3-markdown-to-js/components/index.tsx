import { MDXComponents } from 'mdx/types';

import { Task } from './boxout/Task';

export function useMDXComponents(): MDXComponents {
  // const ctx = {}
  return {
    div(props) {
      if (props.class.includes('task')) {
        return <Task {...props} />;
      }
      return <div {...props} />;
    },
  };
}
