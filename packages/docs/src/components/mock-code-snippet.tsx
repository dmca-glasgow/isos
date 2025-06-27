import { styled } from '@linaria/react';

import { HTMLPreview } from '../content-styles';
import { unindentStringAndTrim } from '../unindent-string';
import { SyntaxHighlight } from './syntax-highlight';

type Props = {
  latex?: string;
  markdown?: string;
  result: string;
};

export function MockCodeSnippet({ latex, markdown, result }: Props) {
  const content = unindentStringAndTrim(latex || markdown || '');

  return (
    <Columns>
      <Column>
        <StyledSourceCode>
          <TabList>
            {latex && <li className="active">LaTeX</li>}
            {markdown && <li className="active">Markdown</li>}
          </TabList>
          <TabContent>
            <div className="active">
              {latex && (
                <SyntaxHighlight code={content} language="latex" />
              )}
              {markdown && (
                <SyntaxHighlight code={content} language="md" />
              )}
            </div>
          </TabContent>
        </StyledSourceCode>
      </Column>
      <Result>
        <h4>Result</h4>
        <HTMLPreview dangerouslySetInnerHTML={{ __html: result }} />
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
