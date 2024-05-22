import { ComponentChildren } from 'preact';
import { LoadingProvider } from './loading-provider';
import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';

type Props = {
  children: ComponentChildren;
};

const mathjaxConfig: MathJax3Config = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      [`\\[`, `\\]`],
    ],
  },
};

export function Providers({ children }: Props) {
  return (
    <LoadingProvider>
      <MathJaxContext config={mathjaxConfig}>{children}</MathJaxContext>
    </LoadingProvider>
  );
}
