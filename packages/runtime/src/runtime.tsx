import classNames from 'classnames';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import HamburgerSvg from './assets/hamburger.svg';
import { DarkModeToggle } from './components/dark-mode-toggle';
import { PrintButton } from './components/print-button/print-button';
import { ErrorContext } from './providers/error-provider';
// import { PrintViewContext } from './providers/print-view-provider';
import { Sidebar } from './sidebar';

// import { ViewSwitcher } from './view-switcher';
import './styles/index.scss';

type Props = {
  markdown: string;
  show?: boolean;
  onRendered?: () => unknown;
};

if (typeof window !== undefined) {
  const showSideBar = localStorage.getItem('show-sidebar');
  if (String(showSideBar) === 'true') {
    document.documentElement.classList.add('sidebar-open');
  }
}

export function Runtime({ markdown, show, onRendered }: Props) {
  const [js, setJs] = useState({
    article: '',
    tableOfContents: '',
  });
  const { error, setError } = useContext(ErrorContext);
  // const { showPages } = useContext(ViewContext);

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
    if (markdown === '') {
      return;
    }
    (async () => {
      try {
        setJs(await markdownToJs(markdown));
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [markdown]);

  if (markdown === '') {
    return null;
  }

  return (
    <main className={classNames({ show })}>
      {error && (
        <div className="error">
          <span className="error-label">Error:</span> {error}
        </div>
      )}

      <div id="article-wrapper">
        <Article jsString={js.article} onRendered={onRendered} />
      </div>

      <div className="actions-top-left">
        <HamburgerSvg
          className="hamburger"
          onClick={() => setShowSidebar(true)}
        />
      </div>
      <div className="actions-top-right">
        <DarkModeToggle />
        <PrintButton />
      </div>
      <Sidebar
        jsString={js.tableOfContents}
        setShowSidebar={setShowSidebar}
      />
    </main>
  );
}
