import { TableOfContents } from './views/table-of-contents';
import { ViewOptions } from './views/view-options';

import { useLocalStorage } from '@isos/use-local-storage';

import HamburgerSvg from '../assets/hamburger.svg';
import { ViewOptionsProvider } from '../providers/view-options-provider';
import { Menu, SidebarView } from './menu';
import { Print } from './views/print';

import './sidebar.scss';

type Props = {
  jsString: string;
  setShowSidebar: (open: boolean) => unknown;
};

export function Sidebar({ jsString, setShowSidebar }: Props) {
  const [sidebarView, setSidebarView] = useLocalStorage(
    'sidebar-view',
    SidebarView.tableOfContents,
  );

  function handleSetSidebarView(view: SidebarView) {
    setSidebarView(view);
    if (view === SidebarView.print) {
      document.documentElement.classList.add('print-view');
    } else {
      document.documentElement.classList.remove('print-view');
    }
  }

  return (
    <nav>
      <div className="actions-top-left">
        <HamburgerSvg
          className="hamburger"
          onClick={() => setShowSidebar(false)}
        />
        <Menu
          sidebarView={sidebarView as SidebarView}
          setSidebarView={handleSetSidebarView}
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
  switch (view) {
    case SidebarView.tableOfContents:
      return <TableOfContents jsString={jsString} />;
    case SidebarView.viewOptions:
      return <ViewOptions />;
    case SidebarView.print:
      return <Print />;
    default:
      return null;
  }
}
