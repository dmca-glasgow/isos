import { Article } from './article';
import { Sidebar } from './sidebar';

export { LoadingContext, LoadingProvider } from './loading-provider';

export function App() {
  return (
    <>
      {/* <Sidebar /> */}
      <Article />
    </>
  );
}
