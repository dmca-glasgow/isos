// import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import { ComponentChildren } from 'preact';

import { ErrorProvider } from './error-provider';
import { LoadingProvider } from './loading-provider';
import { ViewOptionsProvider } from './view-options-provider';

type Props = {
  children: ComponentChildren;
};

// const mathjaxConfig: MathJax3Config = {
//   tex: {
//     inlineMath: [
//       ['$', '$'],
//       // ['\\(', '\\)'],
//     ],
//     displayMath: [
//       ['$$', '$$'],
//       // [`\\[`, `\\]`],
//     ],
//   },
// };

export function Providers({ children }: Props) {
  return (
    <ViewOptionsProvider>
      <LoadingProvider>
        <ErrorProvider>
          {/* <MathJaxContext config={mathjaxConfig}> */}
          {children}
          {/* </MathJaxContext> */}
        </ErrorProvider>
      </LoadingProvider>
    </ViewOptionsProvider>
  );
}
