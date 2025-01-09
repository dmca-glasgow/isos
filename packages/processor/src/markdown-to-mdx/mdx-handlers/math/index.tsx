import { useContext } from 'preact/hooks';

import { toLaTeX } from './latex';
import { render } from './litedom';
import { getMathJax, toMathJaxJSX, toMathJaxString } from './mathjax';
import { MathsContext } from './maths-provider';

export { MathsContext, MathsProvider } from './maths-provider';

export type { FontName } from './mathjax';

type Props = {
  expr: string;
  className: string;
  asString: boolean;
};

export function MathJax({ expr, className, asString = false }: Props) {
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

  if (asString) {
    if (className === 'math-inline') {
      return (
        <span
          className="maths"
          dangerouslySetInnerHTML={{
            __html: toMathJaxString(expr, ctx.fontName),
          }}
        />
      );
    }

    if (className === 'math-display') {
      return (
        <div
          className="maths"
          dangerouslySetInnerHTML={{
            __html: toMathJaxString(expr, ctx.fontName),
          }}
        />
      );
    }
  }

  if (className === 'math-inline') {
    return (
      <span className="maths">{toMathJaxJSX(expr, ctx.fontName)}</span>
    );
  }

  if (className === 'math-display') {
    return <div className="maths">{toMathJaxJSX(expr, ctx.fontName)}</div>;
  }

  throw new Error(`[maths] className '${className}' is not supported`);
}

// const children = getMathJax(expr, ctx.fontName);

//   if (className === 'math-inline') {
//     return (
//       <span
//         className="maths"
//         dangerouslySetInnerHTML={{
//           __html: children,
//         }}
//       />
//     );
//   }

//   if (className === 'math-display') {
//     return (
//       <div
//         className="maths"
//         dangerouslySetInnerHTML={{
//           __html: children,
//         }}
//       />
//     );
//   }
