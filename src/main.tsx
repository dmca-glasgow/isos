import { Providers } from '../packages/runtime/src';
import { render } from 'preact';

import { App } from './app';

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')!,
);
