import { ViewOptions } from './view-options';
import { styled } from '@linaria/react';
import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { runOptions } from '@isos/processor';
import { useLocalStorage } from '@isos/use-local-storage';

import { Hamburger } from './components/hamburger';
import { Logo } from './components/logo';

type Props = {
  jsString: string;
};

export function Sidebar({ jsString }: Props) {
  const [TOC, setTOC] = useState<MDXModule | null>(null);
  const TOCContent = TOC ? TOC.default : Fragment;
  const [showViewOptions, setShowViewOptions] = useLocalStorage(
    'show-view-options',
    'false'
  );

  useEffect(() => {
    (async () => {
      setTOC(await run(jsString, runOptions));
    })();
  }, [jsString]);

  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <Hamburger
        className="hamburger"
        onClick={() => setShowSidebar(false)}
      />
      <ViewOptionsToggle
        className="view-options-btn"
        onClick={() =>
          setShowViewOptions(showViewOptions === 'true' ? 'false' : 'true')
        }>
        View options
      </ViewOptionsToggle>
      {showViewOptions === 'true' ? (
        <ViewOptions />
      ) : (
        <Nav>
          <TOCContent />
        </Nav>
      )}
    </StyledSidebar>
  );
}

export function setShowSidebar(open: boolean) {
  if (open) {
    document.documentElement.classList.add('sidebar-open');
  } else {
    document.documentElement.classList.remove('sidebar-open');
  }
}

const StyledSidebar = styled.aside`
  /* background: #ae7070; */
`;

const ViewOptionsToggle = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem 0.25rem;
  font-size: 0.8rem;
  line-height: 1.5rem;
  font-weight: bold;
  color: rgba(var(--primaryColor), 1);
  background: rgba(var(--primaryColor), 0.1);
  border-radius: 0.2rem;
  user-select: none;
  transition: background 0.2s;
  margin: 0 2rem;
  cursor: pointer;

  &:hover {
    background: rgba(var(--primaryColor), 0.2);
  }
`;

const Nav = styled.nav`
  padding-top: 2rem;
`;
