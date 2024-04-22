import { Header } from './header';

import './styles.css';

// TODO: import using an npm workspace module export
import { App as Article } from 'runtime';

export function App() {
  return (
    <>
      <Header />
      <Article />
    </>
  );
}
