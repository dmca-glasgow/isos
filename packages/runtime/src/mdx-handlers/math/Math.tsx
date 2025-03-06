import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../../context';
import { toLaTeX } from './latex';
import {
  MathJaxComponentsDisplay,
  MathJaxComponentsInline,
} from './mathjax-components/MathJaxComponents';
import { toMathJaxSvgString } from './mathjax-prerender';

export type MathsFont = 'fira' | 'termes';

type Props = {
  expr: string;
  asComponents?: boolean;
  asString?: boolean;
};

export function MathInline({ expr, asComponents = true }: Props) {
  const {
    data: { mathsAsTex, mathsFontName },
  } = useContext(ViewOptionsContext);

  if (mathsAsTex.value) {
    return <Maths className="latex" html={toLaTeX(expr)} />;
  }

  if (asComponents) {
    return (
      <MathJaxComponentsInline
        expr={expr}
        mathsFont={mathsFontName.value as MathsFont}
      />
    );
  }

  return (
    <Maths
      className="maths"
      html={toMathJaxSvgString(expr, mathsFontName.value as MathsFont)}
    />
  );
}

export function MathDisplay({ expr, asComponents = true }: Props) {
  const {
    data: { mathsAsTex, mathsFontName },
  } = useContext(ViewOptionsContext);

  if (mathsAsTex.value) {
    return <Maths className="latex" html={toLaTeX(expr)} />;
  }

  if (asComponents) {
    return (
      <MathJaxComponentsDisplay
        expr={expr}
        mathsFont={mathsFontName.value as MathsFont}
      />
    );
  }

  return (
    <Maths
      className="maths"
      html={toMathJaxSvgString(expr, mathsFontName.value as MathsFont)}
    />
  );
}

type MathsProps = {
  className: string;
  html: string;
};

function Maths({ className, html }: MathsProps) {
  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
