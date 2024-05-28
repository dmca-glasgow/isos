import { styled } from '@linaria/react';
import { run } from '@mdx-js/mdx';
import classNames from 'classnames';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { runOptions } from '@isos/processor';

import { Logo } from './components/logo';

type Props = {
  jsString: string;
};

export function Sidebar({ jsString }: Props) {
  const [TOC, setTOC] = useState<MDXModule | null>(null);
  const [showViewOptions, setShowViewOptions] = useState(false);
  const TOCContent = TOC ? TOC.default : Fragment;

  useEffect(() => {
    (async () => {
      setTOC(await run(jsString, runOptions));
    })();
  }, [jsString]);

  return (
    <StyledSidebar
      className={classNames({
        'show-toc': !showViewOptions,
        'show-view-options': showViewOptions,
      })}>
      <Logo />
      <ViewOptionsToggle
        onClick={() => setShowViewOptions(!showViewOptions)}>
        View options
      </ViewOptionsToggle>
      <Nav>
        <TOCContent />
      </Nav>
      <ViewOptionsPane>View options pane</ViewOptionsPane>
    </StyledSidebar>
  );
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

  .show-view-options & {
    display: none;
  }
`;

const ViewOptionsPane = styled.div`
  .show-toc & {
    display: none;
  }
`;
