import { ComponentChildren } from 'preact';

import { MathsProvider, TocHighlightProvider } from '@isos/processor';

import { ErrorProvider } from './error-provider';
import { LoadingProvider } from './loading-provider';

// import { ViewProvider } from './view-provider';

type Props = {
  children: ComponentChildren;
};

export function Providers({ children }: Props) {
  return (
    <TocHighlightProvider>
      <LoadingProvider>
        <ErrorProvider>
          {/* <ViewProvider> */}
          <MathsProvider>{children}</MathsProvider>
          {/* </ViewProvider> */}
        </ErrorProvider>
      </LoadingProvider>
    </TocHighlightProvider>
  );
}
