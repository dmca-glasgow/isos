import { useContext } from 'preact/hooks';

import { toLaTeX } from './latex';
import { render } from './litedom';
import { getMathJax } from './mathjax';
import { MathsContext } from './maths-provider';

export { MathsContext, MathsProvider } from './maths-provider';

export type { FontName } from './mathjax';

type Props = {
  expr: string;
  className: string;
};

export function MathJax({ expr, className }: Props) {
  // console.log(className);
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
  }

  const children = getMathJax(expr, ctx.fontName);

  if (className === 'math-inline') {
    return <span className="maths">{render(children)}</span>;
  }

  if (className === 'math-display') {
    return <div className="maths">{render(children)}</div>;
  }

  throw new Error(`[maths] className '${className}' is not supported`);
}
