import { ComponentChildren } from 'preact';

import { MathsProvider } from '@isos/processor';

// import { ErrorProvider } from './error-provider';
import { PrintViewProvider } from './print-view-provider';

// import { ViewOptionsProvider } from './view-options-provider';

type Props = {
  children: ComponentChildren;
};

export function Providers({ children }: Props) {
  return (
    // <TocHighlightProvider>
    <MathsProvider>
      {/* <ErrorProvider> */}
      {/* <ViewOptionsProvider> */}
      <PrintViewProvider>{children}</PrintViewProvider>
      {/* </ViewOptionsProvider> */}
      {/* </ErrorProvider> */}
    </MathsProvider>
    // </TocHighlightProvider>
  );
}
