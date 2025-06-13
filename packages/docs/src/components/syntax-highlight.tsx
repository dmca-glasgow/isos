// @ts-expect-error
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-expect-error
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';

import { unindentStringAndTrim } from '../unindent-string';

const styles = themes.materialDark;
delete styles['pre[class*="language-"]'].margin;
delete styles['pre[class*="language-"]'].overflow;

type Props = {
  code: string;
  language: string;
};

export function SyntaxHighlight({ code, language }: Props) {
  return (
    <SyntaxHighlighter language={language} style={styles}>
      {unindentStringAndTrim(code)}
    </SyntaxHighlighter>
  );
}
