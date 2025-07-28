import { MathsFormat, MathsState } from '../mdx-state';
import { formatLaTeX, syntaxHighlight } from './latex';
import { MathJaxPrerender } from './mathjax-prerender';

type Props = {
  expr: string;
  options: MathsState;
  format: MathsFormat;
  asComponents?: boolean;
};

export function Maths({
  expr,
  options,
  // format,
  // asComponents = true,
}: Props) {
  if (options.mathsAsTex.value) {
    const formatted = formatLaTeX(expr);
    if (options.syntaxHighlight.value) {
      return (
        <CodeElement className="latex" html={syntaxHighlight(formatted)} />
      );
    } else {
      return <CodeElement className="latex" html={formatted} />;
    }
  }

  // if (asComponents) {
  //   return (
  //     <MathJaxComponentsDisplay
  //       expr={expr}
  //       // format={format}
  //       mathsFont={options.mathsFontName.value}
  //     />
  //   );
  // }

  return (
    <MathJaxPrerender className="maths" expr={expr} options={options} />
  );
}

type MathsProps = {
  className: string;
  html: string;
};

function CodeElement({ className, html }: MathsProps) {
  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
