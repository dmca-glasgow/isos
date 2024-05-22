import { render } from 'preact';
import { Article } from './article';
import { Providers } from './providers';
import './styles/index.scss';

// lift markdown from embedded textarea
const textarea = document.getElementById('article') as HTMLTextAreaElement;
const markdown = textarea?.value || '';

render(
  <Providers>
    <Article markdown={markdown} />
  </Providers>,
  document.getElementById('root')!
);
