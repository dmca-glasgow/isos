import type { LiteDocument } from 'mathjax-full/js/adaptors/lite/Document.js';
import {
  LiteElement,
  LiteNode,
} from 'mathjax-full/js/adaptors/lite/Element.js';
import type { LiteText } from 'mathjax-full/js/adaptors/lite/Text.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import type { MathDocument } from 'mathjax-full/js/core/MathDocument.js';
import type { OutputJax } from 'mathjax-full/js/core/OutputJax.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { SVG } from 'mathjax-full/js/output/svg.js';

import { MathsFont } from '../Maths';
import { FiraFont, TermesFont } from './fonts';
// import { render } from './litedom';
import { packages } from './packages';

type Document = MathDocument<LiteNode, LiteText, LiteDocument>;
type Output = OutputJax<LiteNode, LiteText, LiteDocument>;

type FontOutput = Record<MathsFont, Output>;

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const doc: Document = mathjax.document('', {
  InputJax: new TeX({
    packages,
  }),
});

const output: FontOutput = {
  termes: new SVG({ fontData: TermesFont }),
  fira: new SVG({ fontData: FiraFont }),
};

export function toMathJaxSvgString(expr: string, fontName: MathsFont) {
  doc.outputJax = output[fontName];
  doc.outputJax.setAdaptor(doc.adaptor);

  // TODO get pounds working
  // const expr = _expr.replace(/\\pounds/g, '\\it\\unicode{xA3}');

  const node = doc.convert(expr) as LiteElement;
  if ((node.children || []).length === 0) {
    console.log('[mathjax]: node has no children');
    return '';
  }
  const svg = node.children[0] as LiteElement;
  return adaptor.outerHTML(svg);
}

// export function toMathJaxSvgJSX(expr: string, fontName: MathsFont) {
//   doc.outputJax = output[fontName];
//   doc.outputJax.setAdaptor(doc.adaptor);
//   const node = doc.convert(expr) as LiteElement;
//   return render(node.children);
// }
