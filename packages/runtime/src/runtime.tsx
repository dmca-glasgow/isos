import { styled } from '@linaria/react';
import { useContext, useEffect, useState } from 'preact/hooks';

import { markdownToJs } from '@isos/processor';

import { Article } from './article';
import { Hamburger } from './components/hamburger';
import { ErrorContext } from './providers/error-provider';
import { Sidebar, setShowSidebar } from './sidebar';

import './styles/index.scss';

type Props = {
  markdown: string;
};

export function Runtime({ markdown }: Props) {
  const [toc, setToc] = useState('');
  const [article, setArticle] = useState('');
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      try {
        const js = await markdownToJs(markdown);
        setError('');
        setToc(js.tableOfContents);
        setArticle(js.article);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [markdown]);

  return (
    <Wrapper className="runtime">
      {error && (
        <Error className="error">
          <ErrorLabel>Error:</ErrorLabel> {error}
        </Error>
      )}
      <main>
        <Article jsString={article} />
      </main>
      <Hamburger
        className="hamburger"
        onClick={() => setShowSidebar(true)}
      />
      <Sidebar jsString={toc} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* overflow: auto; */
  position: relative;
`;

const Error = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: #b41b1b;
  color: white;
  padding: 0 0.6rem;
  font-size: 0.6rem;
`;

const ErrorLabel = styled.span`
  font-weight: bold;
`;
