import { Signal } from '@preact/signals';

import { formatLaTeX, syntaxHighlight } from './latex';
// import {
//   MathJaxComponentsDisplay,
//   MathJaxComponentsInline,
// } from './mathjax-components/MathJaxComponents';
import { toMathJaxSvgString } from './mathjax-prerender';

export type MathsFont = 'fira' | 'termes';
export type MathsFormat = 'display' | 'inline';

export type MathsOptions = {
  mathsFontName: Signal<MathsFont>;
  mathsAsTex: Signal<boolean>;
  syntaxHighlight: Signal<boolean>;
};

type Props = {
  expr: string;
  options: MathsOptions;
  format: MathsFormat;
  asComponents?: boolean;
};

export function Maths({
  expr,
  options,
  // format,
  // asComponents = false,
}: Props) {
  if (options.mathsAsTex.value) {
    const formatted = formatLaTeX(expr);
    if (options.syntaxHighlight.value) {
      return (
        <MathsElement
          className="latex"
          html={syntaxHighlight(formatted)}
        />
      );
    } else {
      return <MathsElement className="latex" html={formatted} />;
    }
  }

  // if (asComponents) {
  //   return (
  //     <MathJaxComponentsInline
  //       expr={expr}
  //       format={format}
  //       mathsFont={mathsFontName.value}
  //     />
  //   );
  // }

  return (
    <MathsElement
      className="maths"
      html={toMathJaxSvgString(expr, options.mathsFontName.value)}
    />
  );
}

type MathsProps = {
  className: string;
  html: string;
};

function MathsElement({ className, html }: MathsProps) {
  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
