import { render } from 'preact';
import { App } from './app';
import { Providers } from '@isos/runtime';
// import { cli } from './cli';

// cli();

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')!
);
