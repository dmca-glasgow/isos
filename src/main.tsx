import { render } from 'preact';

import { Providers } from '@isos/runtime';

import { App } from './app';

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')!,
);
