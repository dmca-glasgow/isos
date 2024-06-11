import { styled } from '@linaria/react';
import { useEffect, useState } from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import { Hamburger } from './components/hamburger';
import { Sidebar, setShowSidebar } from './sidebar';

type Props = {
  markdown: string;
};

export function Runtime({ markdown }: Props) {
  const [toc, setToc] = useState('');
  const [article, setArticle] = useState('');

  useEffect(() => {
    (async () => {
      const js = await markdownToJs(markdown);
      setToc(js.tableOfContents);
      setArticle(js.article);
    })();
  }, [markdown]);

  return (
    <Wrapper className="runtime">
      <main>
        <Article jsString={article} />
      </main>
      <StyledHamburger onClick={() => setShowSidebar(true)} />
      <Sidebar jsString={toc} />
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
