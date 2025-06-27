import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

// import { Prism } from 'prism-react-renderer';

import {
  RenderMDX,
  createInputToMarkdownOptions,
  createInputToMarkdownTestContext,
  createMdxState,
  // embedIncludes,
  inputToMarkdown,
  markdownToArticle,
} from '@isos/processor';

import { HTMLPreview } from '../content-styles';
import { unindentStringAndTrim } from '../unindent-string';
import { SyntaxHighlight } from './syntax-highlight';

type Props = {
  latex: string;
  withImages?: Record<string, string>;
  withFiles?: Record<string, string>;
};

const mdxState = createMdxState();

export function CodeSnippet(props: Props) {
  const latex = unindentStringAndTrim(props.latex);
  const [active, setActive] = useState<'tex' | 'md'>(latex ? 'tex' : 'md');
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    (async () => {
      const prepared = unindentStringAndTrim(latex);
      const ctx = createInputToMarkdownTestContext('latex', prepared);
      if (props.withImages) {
        ctx.base64Images = props.withImages;
      }
      const options = createInputToMarkdownOptions(ctx);
      // await embedIncludes(ctx, options);
      setMarkdown(await inputToMarkdown(ctx.content, options));
    })();
  }, [latex]);

  return (
    <Columns>
      <Column>
        <StyledSourceCode>
          <TabList>
            <li
              className={classNames({ active: active === 'tex' })}
              onClick={() => setActive('tex')}>
              LaTeX
            </li>
            <li
              className={classNames({ active: active === 'md' })}
              onClick={() => setActive('md')}>
              Markdown
            </li>
          </TabList>
          <TabContent>
            <div className={classNames({ active: active === 'tex' })}>
              <SyntaxHighlight code={latex} language="latex" />
            </div>
            <div className={classNames({ active: active === 'md' })}>
              <SyntaxHighlight code={markdown} language="md" />
            </div>
          </TabContent>
        </StyledSourceCode>
      </Column>
      <Result>
        <h4>Result</h4>
        <HTMLPreview>
          <RenderMDX
            markdown={markdown}
            mdxState={mdxState}
            renderFn={markdownToArticle}
            onError={(err) => {
              throw err;
            }}
            // onRendered={onRendered}
          />
        </HTMLPreview>
      </Result>
    </Columns>
  );
}

const flexGap = '2rem';

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${flexGap};
  margin: 2rem 0 3rem;
`;

const Column = styled.div`
  display: flex;
  width: calc(50% - (${flexGap} / 2));

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const StyledSourceCode = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabList = styled.ul`
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    display: inline-block;
    margin-right: 0.5em;
    padding: 0.25em 1em;
    border-radius: 0.3em 0.3em 0 0;
    background: rgb(47, 47, 47);
    cursor: pointer;

    &:not(.active) {
      opacity: 0.5;
    }
  }
`;

const TabContent = styled.div`
  flex: 1;
  background: rgb(47, 47, 47);
  overflow-x: auto;

  & > div {
    &:not(.active) {
      display: none;
    }
  }
  pre {
    padding: 1em;
  }
`;

const Result = styled(Column)`
  flex-direction: column;

  & > h4 {
    align-self: flex-start;
    margin: 0;
    font-weight: normal;
    display: inline-block;
    padding: 0.25em 1em;
    border-radius: 0.3em 0.3em 0 0;
    background: rgb(47, 47, 47);
  }
`;
