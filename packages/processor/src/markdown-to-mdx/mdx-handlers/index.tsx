import { Options } from '../options';
import { MDXComponents } from 'mdx/types';

import { MathJax } from './math';
import { Task } from './task/Task';
import { Section } from './toc-highlight/section';

export function createMDXComponents(options: Partial<Options>) {
  // const ctx = {}
  return (): MDXComponents => ({
    div(props) {
      if (props.class?.includes('task')) {
        return <Task {...props} />;
      } else {
        return <div {...props} />;
      }
    },

    // TODO: remove sectionize and use the titles
    section: Section,
    code(props) {
      if (props.class?.includes('language-math')) {
        return (
          <MathJax
            expr={props.children}
            className={props.class.replace('language-math', '').trim()}
          />
        );
      }
      return <code {...props} />;
    },
  });
}
