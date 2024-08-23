import './index.css';
import { render } from 'preact';

import Docs from './docs.mdx';
import { Downloads } from './downloads.tsx';
import logoSrc from './logo.png';

const components = {
  Downloads,
};

function App() {
  return (
    <>
      <div className="logo">
        <img src={logoSrc} />
      </div>
      <main>
        <Docs components={components} />
      </main>
    </>
  );
}

render(<App />, document.getElementById('app')!);
