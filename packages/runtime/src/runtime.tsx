import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import { Hamburger } from './components/hamburger';
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
    <Wrapper
      className={classNames('runtime', { 'show-sidebar': showSidebar })}>
      <main>
        <Article jsString={article} />
      </main>
      <StyledHamburger onClick={() => setShowSidebar(true)} />
      <Sidebar
        jsString={toc}
        onHamburgerClick={() => setShowSidebar(false)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* overflow: auto; */
`;

const StyledHamburger = styled(Hamburger)`
  position: fixed;
  left: 2rem;
`;
