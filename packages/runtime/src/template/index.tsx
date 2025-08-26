import { styled } from '@linaria/react';
import { useContext } from 'preact/hooks';

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
  const { data, toggleSidebar } = useContext(ViewOptionsContext);

  return (
    <>
      <ActionsTopLeft>
        <HamburgerButton
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          aria-controls="sidebar"
          aria-expanded={data.showSidebar.value}>
          <Hamburger />
        </HamburgerButton>
      </ActionsTopLeft>

      {/* <ActionsTopRight><DarkModeToggle /></ActionsTopRight> */}

      <Sidebar id="sidebar">
        <ActionsTopRight>
          <Menu />
        </ActionsTopRight>
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
  z-index: 1;
`;

const ActionsTopRight = styled.div`
  position: absolute;
  top: ${actions.y};
  right: ${actions.x};
  height: ${actions.height};
`;

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
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${sidebarWidth};
  height: 100%;
  margin-left: -${sidebarWidth};
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--sidebarBg);

  ${scrollbarOnHover('var(--textColor)', 'var(--sidebarBg)')};

  @media (prefers-reduced-motion: no-preference) {
    transition: margin-left var(--transitionDuration);
  }

  #root.sidebar-show & {
    margin-left: 0;
  }
`;

const View = styled.div`
  padding-top: 4.5em;
`;
