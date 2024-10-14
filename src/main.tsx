// import { cli } from './cli';
// cli();
// import { resolveResource } from '@tauri-apps/api/path';
// import { readTextFile } from '@tauri-apps/plugin-fs';
import { render } from 'preact';

import { Providers } from '@isos/runtime';

import { App } from './app';

// const scriptElem1 = document.createElement('script');
// const resourcePath1 = await resolveResource(
//   'resources/mathjax-full/bundle/tex-mml-chtml.js',
// );
// scriptElem1.innerText = await readTextFile(resourcePath1);
// document.head.appendChild(scriptElem1);

// const scriptElem2 = document.createElement('script');
// const resourcePath = await resolveResource(
//   'resources/mathjax-fira-font/tex-mml-chtml-mathjax-fira.js',
// );
// scriptElem2.innerText = await readTextFile(resourcePath);
// document.head.appendChild(scriptElem2);

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')!,
);
