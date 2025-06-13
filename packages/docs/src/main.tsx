import './index.scss';

import { render } from 'preact';

import { CodeSnippet } from './components/code-snippet.tsx';
import { Downloads } from './components/downloads.tsx';
import { SyntaxHighlight } from './components/syntax-highlight.tsx';
import Headings from './content/headings.mdx';
import Intro from './content/intro.mdx';
import Referencing from './content/referencing.mdx';
import Tables from './content/tables.mdx';
import logoSrc from './logo.png';

const components = {
  Downloads,
  CodeSnippet,
  SyntaxHighlight,
};

function App() {
  return (
    <>
      <div className="logo">
        <div>
          <img src={logoSrc} />
        </div>
      </div>
      <main>
        <Intro components={components} />
        <Headings components={components} />
        <Referencing components={components} />
        <Tables components={components} />
      </main>
    </>
  );
}

render(<App />, document.getElementById('app')!);
