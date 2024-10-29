// import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import { ComponentChildren } from 'preact';

import { MathsProvider, TocHighlightProvider } from '@isos/processor';

import { ErrorProvider } from './error-provider';
import { LoadingProvider } from './loading-provider';

type Props = {
  children: ComponentChildren;
};

export function Providers({ children }: Props) {
  return (
    <TocHighlightProvider>
      <LoadingProvider>
        <ErrorProvider>
          <MathsProvider>{children}</MathsProvider>
        </ErrorProvider>
      </LoadingProvider>
    </TocHighlightProvider>
  );
}
