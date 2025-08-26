import { styled } from '@linaria/react';
import { useContext, useEffect, useRef } from 'preact/hooks';

import { actions, sidebarWidth } from '../constants';
import { scrollbarOnHover } from '../scrollbars';
import { Hamburger } from './icons';
import { Menu } from './menu';
import { TableOfContents } from './table-of-contents';
import { ViewOptions } from './view-options';
import { ViewOptionsContext } from './view-options/state';

type Props = {
  markdown: string;
};

export function Template({ markdown }: Props) {
  const { data, setShowSidebar } = useContext(ViewOptionsContext);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function escapeKeyToClose(e: KeyboardEvent) {
      if (data.showSidebar.value) {
        if (e.key === 'Escape') {
          setShowSidebar(false);
        }
      }
    }
    function clickOutsideToClose(e: MouseEvent) {
      if (data.showSidebar.value) {
        if (ref.current && !ref.current.contains(e.target as Element)) {
          setShowSidebar(false);
        }
      }
    }
    window.addEventListener('keydown', escapeKeyToClose);
    document.addEventListener('mousedown', clickOutsideToClose);
    return () => {
      window.removeEventListener('keydown', escapeKeyToClose);
      document.removeEventListener('mousedown', clickOutsideToClose);
    };
  }, [data.showSidebar.value]);

  return (
    <>
      <ActionsTopLeft>
        <HamburgerButton
          onClick={() => setShowSidebar(true)}
          aria-label="Show sidebar"
          aria-controls="sidebar">
          <Hamburger />
        </HamburgerButton>
      </ActionsTopLeft>

      {/* <ActionsTopRight><DarkModeToggle /></ActionsTopRight> */}

      <Sidebar id="sidebar" ref={ref}>
        <SidebarTop>
          <HamburgerButton
            onClick={() => setShowSidebar(false)}
            aria-label="Hide sidebar"
            aria-controls="sidebar">
            <Hamburger />
          </HamburgerButton>
          <Menu />
        </SidebarTop>
        <View>
          <TableOfContents markdown={markdown} />
          <ViewOptions />
        </View>
      </Sidebar>
    </>
  );
}

const ActionsTopLeft = styled.div`
  position: fixed;
  top: ${actions.y};
  left: ${actions.x};
  height: ${actions.height};
`;

// const ActionsTopRight = styled.div`
//   position: absolute;
//   top: ${actions.y};
//   right: ${actions.x};
//   height: ${actions.height};
// `;

const HamburgerButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;

  &,
  svg {
    display: block;
    width: ${actions.height};
    height: ${actions.height};
  }

  svg {
    fill: var(--textColor);
  }

  #sidebar & {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: ${sidebarWidth};
  height: 100%;
  margin-left: -${sidebarWidth};
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--sidebarBg);
  transition: margin-left var(--transitionDuration);

  ${scrollbarOnHover('var(--textColor)', 'var(--sidebarBg)')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  #root.sidebar-show & {
    margin-left: 0;
  }
`;

const SidebarTop = styled.div`
  padding: ${actions.y} ${actions.x};
  height: ${actions.height};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const View = styled.div`
  margin-top: 0.75em;
`;
