import { ViewOptions } from './view-options';
import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { sidebarRunOptions } from '@isos/processor';
import { useLocalStorage } from '@isos/use-local-storage';

import { Hamburger } from '../components/hamburger';
import { ViewOptionsProvider } from '../providers/view-options-provider';

// import { Logo } from './components/logo';

type Props = {
  // mdast: ListItem[];
  jsString: string;
  setShowSidebar: (open: boolean) => unknown;
};

export function Sidebar({ jsString, setShowSidebar }: Props) {
  const [TOC, setTOC] = useState<MDXModule | null>(null);
  const TOCContent = TOC ? TOC.default : Fragment;
  const [showViewOptions, setShowViewOptions] = useLocalStorage(
    'show-view-options',
    'false',
  );

  useEffect(() => {
    (async () => {
      setTOC(await run(jsString, sidebarRunOptions));
    })();
  }, [jsString]);

  return (
    <ViewOptionsProvider>
      <nav>
        {/* <Logo /> */}
        <div className="actions">
          <Hamburger
            className="hamburger"
            onClick={() => setShowSidebar(false)}
          />
          {showViewOptions === 'true' ? (
            <button
              className="view-options-btn"
              onClick={() => setShowViewOptions('false')}>
              ← Back
            </button>
          ) : (
            <button
              className="view-options-btn"
              onClick={() => setShowViewOptions('true')}>
              View options
              <ThemeIcon />
            </button>
          )}
        </div>
        {showViewOptions === 'true' ? (
          <ViewOptions />
        ) : (
          <TOCContent />
          // <ol>
          //   {mdast.map((li) => {
          //     const p = li.children[0] as Paragraph;
          //     const link = p.children[0] as Link;
          //     // @ts-expect-error
          //     const depth = li.data?.depth;
          //     return (
          //       <li
          //         className={classNames({
          //           [`depth-${depth}`]: depth,
          //           active: link.url === `#${activeSectionId}`,
          //         })}>
          //         <a href={link.url}>{toString(link.children)}</a>
          //       </li>
          //     );
          //   })}
          // </ol>
        )}
      </nav>
    </ViewOptionsProvider>
  );
}

function ThemeIcon() {
  return (
    <svg viewBox="0 0 20 20">
      <path
        d="M10,20c5.5,0,10-4.5,10-10S15.5,0,10,0S0,4.5,0,10S4.5,20,10,20z
        M10,18.5v-17c4.7,0,8.5,3.8,8.5,8.5 S14.7,18.5,10,18.5z"
      />
    </svg>
  );
}
