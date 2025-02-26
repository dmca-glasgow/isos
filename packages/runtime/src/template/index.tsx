import { actions, sidebarWidth } from '../constants';
import { scrollbarOnHover } from '../scrollbars';
import { Hamburger } from './icons';
import { TableOfContents } from './table-of-contents';
import { ViewOptions } from './view-options';
import { styled } from '@linaria/react';
import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../context';
import { Menu } from './menu';

type Props = {
  markdown: string;
};

export function Template({ markdown }: Props) {
  const { setShowSidebar } = useContext(ViewOptionsContext);

  return (
    <>
      <ActionsTopLeft>
        <StyledHamburger onClick={() => setShowSidebar(true)} />
      </ActionsTopLeft>

      {/* <ActionsTopRight><DarkModeToggle /></ActionsTopRight> */}

      <Sidebar>
        <ActionsTopLeft>
          <StyledHamburger onClick={() => setShowSidebar(false)} />
          <Menu />
        </ActionsTopLeft>
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

  nav & {
    position: absolute;
    width: calc(100% - (${actions.y} * 2));
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

// const ActionsTopRight = styled.div`
//   position: fixed;
//   top: ${actions.y};
//   right: ${actions.x};
//   height: ${actions.height};
// `;

const StyledHamburger = styled(Hamburger)`
  display: block;
  width: $actionsHeight;
  height: $actionsHeight;
  fill: var(--textColor);
  cursor: pointer;

  nav & {
    position: static;
  }
`;

const Sidebar = styled.nav`
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
