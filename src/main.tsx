import { render } from 'preact';
import { App } from './app';
import { LoadingProvider } from '../packages/runtime/src/loading-provider';
// import { cli } from './cli';

// cli();

render(
  <LoadingProvider>
    <App />
  </LoadingProvider>,
  document.getElementById('root')!
);
