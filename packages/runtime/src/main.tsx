import { Providers } from './providers';
import { render } from 'preact';

import { Runtime } from './runtime';

import './styles/index.scss';

// lift markdown from embedded textarea
const textarea = document.getElementById('article') as HTMLTextAreaElement;
const markdown = textarea?.value || '';

render(
  <Providers>
    <Runtime markdown={markdown} />
  </Providers>,
  document.getElementById('root')!
);
