import { Providers } from './providers';
import { render } from 'preact';

import { Runtime } from './runtime';

// lift markdown from embedded textarea
const textarea = document.querySelector<HTMLTextAreaElement>('#article');
const markdown = (textarea?.value || '').trim();

render(
  <Providers>
    <Runtime show markdown={markdown} />
  </Providers>,
  document.getElementById('root')!,
);
