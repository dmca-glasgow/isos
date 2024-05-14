import { render } from 'preact';
import { App } from './app';
import { LoadingProvider } from './loading-provider';

render(
  <LoadingProvider>
    <App />
  </LoadingProvider>,
  document.getElementById('root')!
);
