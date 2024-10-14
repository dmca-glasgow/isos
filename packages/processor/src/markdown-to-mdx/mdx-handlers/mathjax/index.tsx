import type { LiteDocument } from 'mathjax-full/js/adaptors/lite/Document.js';
import type {
  LiteElement, // LiteNode,
} from 'mathjax-full/js/adaptors/lite/Element.js';
import type { LiteText } from 'mathjax-full/js/adaptors/lite/Text.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
// import { HTMLDocument } from 'mathjax-full/js/handlers/html/HTMLDocument.js';
import type { MathDocument } from 'mathjax-full/js/core/MathDocument.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { SVG } from 'mathjax-full/js/output/svg.js';

import { render } from './litedom';

// export type Document = HTMLDocument<LiteNode, LiteText, LiteDocument>;
export type Document = MathDocument<LiteElement, LiteText, LiteDocument>;

let cache: Document | null = null;

RegisterHTMLHandler(liteAdaptor());

function getConverter(): Document {
  if (cache !== null) {
    return cache;
  }
  const document = mathjax.document('', {
    InputJax: new TeX({ packages: AllPackages }),
    OutputJax: new SVG({ fontCache: 'local' }),
  });
  cache = document;
  return document;
}

type Props = {
  expr: string;
};

export function MathJax({ expr }: Props) {
  const converter = getConverter();
  const node = converter.convert(expr) as LiteElement;
  const children = render(node.children);
  return <>{children}</>;
}
