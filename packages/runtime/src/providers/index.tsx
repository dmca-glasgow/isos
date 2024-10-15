// import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import { ComponentChildren } from 'preact';

import { MathsProvider, TocHighlightProvider } from '@isos/processor';

import { ErrorProvider } from './error-provider';
import { LoadingProvider } from './loading-provider';

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
    <TocHighlightProvider>
      <LoadingProvider>
        <ErrorProvider>
          <MathsProvider>
            {/* <MathJaxContext config={mathjaxConfig}> */}
            {children}
            {/* </MathJaxContext> */}
          </MathsProvider>
        </ErrorProvider>
      </LoadingProvider>
    </TocHighlightProvider>
  );
}
