import { render } from 'preact';

import { Runtime } from './runtime';

// lift markdown from embedded textarea
const root = document.querySelector<HTMLDivElement>('#root')!;
const textarea = document.querySelector<HTMLTextAreaElement>('#article')!;
render(<Runtime markdown={textarea.value.trim()} />, root);
