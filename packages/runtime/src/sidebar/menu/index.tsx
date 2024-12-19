// import './styles.scss';
import { Gear, TableOfContents } from '../../components/icons';
import classNames from 'classnames';

export enum SidebarView {
  tableOfContents = 'table-of-contents',
  viewOptions = 'view-options',
}

type Props = {
  sidebarView: SidebarView;
  setSidebarView: (updatedValue: SidebarView) => unknown;
};

export function Menu({ sidebarView, setSidebarView }: Props) {
  return (
    <div className="menu">
      <div
        className={classNames('toc', {
          active: sidebarView === SidebarView.tableOfContents,
        })}
        onClick={() => setSidebarView(SidebarView.tableOfContents)}>
        <TableOfContents />
      </div>
      <div
        className={classNames('gear', {
          active: sidebarView === SidebarView.viewOptions,
        })}
        onClick={() => setSidebarView(SidebarView.viewOptions)}>
        <Gear />
      </div>
    </div>
  );
}
