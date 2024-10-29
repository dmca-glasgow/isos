import { useContext } from 'preact/hooks';

import { toLaTeX } from './latex';
import { getMathJax } from './mathjax';
import { MathsContext } from './maths-provider';

export { MathsContext, MathsProvider } from './maths-provider';

export type { FontName } from './mathjax';

type Props = {
  expr: string;
};

export function MathJax({ expr }: Props) {
  const ctx = useContext(MathsContext);
  if (ctx.mathsAsTex) {
    return (
      <code
        className="latex"
        dangerouslySetInnerHTML={{
          __html: toLaTeX(expr),
        }}
      />
    );
  } else {
    const children = getMathJax(expr, ctx.fontName);
    return <>{children}</>;
  }
}
