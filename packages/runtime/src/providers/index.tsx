import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import { ComponentChildren } from 'preact';

import { LoadingProvider } from './loading-provider';
import { ViewOptionsProvider } from './view-options-provider';

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

export function Providers({ children }: Props) {
  return (
    <ViewOptionsProvider>
      <LoadingProvider>
        <MathJaxContext config={mathjaxConfig}>{children}</MathJaxContext>
      </LoadingProvider>
    </ViewOptionsProvider>
  );
}
