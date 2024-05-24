// import * as components from '../components';
// import { MDXProvider } from '@mdx-js/preact';
import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
// import { MDXComponents } from 'mdx/types';
import { ComponentChildren } from 'preact';

import { LoadingProvider } from './loading-provider';

type Props = {
  children: ComponentChildren;
};

const mathjaxConfig: MathJax3Config = {
  tex: {
    inlineMath: [
      ['$', '$'],
      // ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      // [`\\[`, `\\]`],
    ],
  },
};

// const components: MDXComponents = {
//   p(props) {
//     console.log('hey!');
//     return <p>{props.children}</p>;
//   },
// };

export function Providers({ children }: Props) {
  return (
    <LoadingProvider>
      {/* <MDXProvider components={components}> */}
      <MathJaxContext config={mathjaxConfig}>{children}</MathJaxContext>
      {/* </MDXProvider> */}
    </LoadingProvider>
  );
}
