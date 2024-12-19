import { TableOfContents } from './views/table-of-contents';
import { ViewOptions } from './views/view-options';
import { useState } from 'preact/hooks';

import HamburgerSvg from '../assets/hamburger.svg';
import { Menu, SidebarView } from './menu';

import './sidebar.scss';

type Props = {
  jsString: string;
  setShowSidebar: (open: boolean) => unknown;
};

export function Sidebar({ jsString, setShowSidebar }: Props) {
  const [sidebarView, setSidebarView] = useState(
    SidebarView.tableOfContents,
  );
  return (
    <nav>
      <div className="actions-top-left">
        <HamburgerSvg
          className="hamburger"
          onClick={() => setShowSidebar(false)}
        />
        <Menu
          sidebarView={sidebarView as SidebarView}
          setSidebarView={setSidebarView}
        />
      </div>
      <div class="view">
        <ViewSwitcher
          view={sidebarView as SidebarView}
          jsString={jsString}
        />
      </div>
    </nav>
  );
}

type ViewSwitcherProps = {
  view: SidebarView;
  jsString: string;
};

function ViewSwitcher({ view, jsString }: ViewSwitcherProps) {
  return (
    <>
      <TableOfContents
        show={view === SidebarView.tableOfContents}
        jsString={jsString}
      />
      <ViewOptions show={view === SidebarView.viewOptions} />
    </>
  );
}
