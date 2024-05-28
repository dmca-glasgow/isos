import { HamburgerIcon, IconDefs } from './components/icons';
import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import { Sidebar } from './sidebar';

type Props = {
  markdown: string;
};

export function Runtime({ markdown }: Props) {
  const [toc, setToc] = useState('');
  const [article, setArticle] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    (async () => {
      const js = await markdownToJs(markdown);
      setToc(js.tableOfContents);
      setArticle(js.article);
    })();
  }, [markdown]);

  return (
    <Wrapper className={classNames({ 'show-sidebar': showSidebar })}>
      <IconDefs />
      <main>
        <Article jsString={article} />
      </main>
      <HamburgerIcon onClick={() => setShowSidebar(true)} />
      <Sidebar jsString={toc} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* position: relative; */
`;
