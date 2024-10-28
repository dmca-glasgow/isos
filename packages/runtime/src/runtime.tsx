import { styled } from '@linaria/react';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import { Hamburger } from './components/hamburger';
import { ErrorContext } from './providers/error-provider';
import { Sidebar } from './sidebar';

import './styles/index.scss';

type Props = {
  markdown: string;
};

if (typeof window !== undefined) {
  const showSideBar = localStorage.getItem('show-sidebar');
  if (String(showSideBar) === 'true') {
    document.documentElement.classList.add('sidebar-open');
  }
}

export function Runtime({ markdown }: Props) {
  const [toc, setToc] = useState('');
  const [article, setArticle] = useState('');
  const { error, setError } = useContext(ErrorContext);

  const setShowSidebar = useCallback((open: boolean) => {
    if (open) {
      document.documentElement.classList.add('sidebar-open');
      localStorage.setItem('show-sidebar', 'true');
    } else {
      document.documentElement.classList.remove('sidebar-open');
      localStorage.setItem('show-sidebar', 'false');
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const js = await markdownToJs(markdown);
        setError('');
        setToc(js.tableOfContents);
        setArticle(js.article);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [markdown]);

  return (
    <main>
      {error && (
        <Error className="error">
          <ErrorLabel>Error:</ErrorLabel> {error}
        </Error>
      )}
      <Article jsString={article} />
      <Hamburger
        className="hamburger"
        onClick={() => setShowSidebar(true)}
      />
      <Sidebar jsString={toc} setShowSidebar={setShowSidebar} />
    </main>
  );
}

const Error = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: #b41b1b;
  color: white;
  padding: 0 0.6rem;
  font-size: 0.6rem;
`;

const ErrorLabel = styled.span`
  font-weight: bold;
`;
