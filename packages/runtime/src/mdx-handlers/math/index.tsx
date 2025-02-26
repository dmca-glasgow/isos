import { useContext } from 'preact/hooks';

// import { MathsContext } from './maths-provider';
import { ViewOptionsContext } from '../../context';
import { toLaTeX } from './latex';
import { MathsFont, toMathJaxJSX, toMathJaxString } from './mathjax';

export { MathsContext, MathsProvider } from './maths-provider';

export type { MathsFont } from './mathjax';

type Props = {
  expr: string;
  className: string;
  asString?: boolean;
};

export function MathJax({ expr, className, asString = false }: Props) {
  const ctx = useContext(ViewOptionsContext);
  const mathsFont = ctx.data.mathsFontName.value as MathsFont;

  if (ctx.data.mathsAsTex.value) {
    return (
      <code
        className="latex"
        dangerouslySetInnerHTML={{
          __html: toLaTeX(expr),
        }}
      />
    );
  }

  if (asString) {
    if (className === 'math-inline') {
      return (
        <span
          className="maths"
          dangerouslySetInnerHTML={{
            __html: toMathJaxString(expr, mathsFont),
          }}
        />
      );
    }

    if (className === 'math-display') {
      return (
        <div
          className="maths"
          dangerouslySetInnerHTML={{
            __html: toMathJaxString(expr, mathsFont),
          }}
        />
      );
    }
  }

  if (className === 'math-inline') {
    return <span className="maths">{toMathJaxJSX(expr, mathsFont)}</span>;
  }

  if (className === 'math-display') {
    return <div className="maths">{toMathJaxJSX(expr, mathsFont)}</div>;
  }

  throw new Error(`[maths] className '${className}' is not supported`);
}
