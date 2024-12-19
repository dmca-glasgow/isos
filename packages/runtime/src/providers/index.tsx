import { ComponentChildren } from 'preact';

import { MathsProvider, TocHighlightProvider } from '@isos/processor';

import { ErrorProvider } from './error-provider';
import { ViewOptionsProvider } from './view-options-provider';
import { ViewProvider } from './view-provider';

type Props = {
  children: ComponentChildren;
};

export function Providers({ children }: Props) {
  return (
    <TocHighlightProvider>
      <ErrorProvider>
        <ViewOptionsProvider>
          <ViewProvider>
            <MathsProvider>{children}</MathsProvider>
          </ViewProvider>
        </ViewOptionsProvider>
      </ErrorProvider>
    </TocHighlightProvider>
  );
}
