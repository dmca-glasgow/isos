import { HamburgerIcon, IconDefs } from './components/icons';
import classNames from 'classnames';
import { useState } from 'preact/hooks';

import { Article } from './article';
import { Sidebar } from './sidebar';

type Props = {
  markdown: string;
};

export function Runtime({ markdown }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);
  // TODO: remark-parse phase here?
  return (
    <div className={classNames({ showSidebar })}>
      <IconDefs />
      <main>
        <Article markdown={markdown} />
      </main>
      <HamburgerIcon onClick={() => setShowSidebar(true)} />
      <Sidebar markdown={markdown} />
    </div>
  );
}
