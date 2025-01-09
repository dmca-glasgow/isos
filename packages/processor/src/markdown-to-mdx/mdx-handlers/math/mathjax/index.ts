import { FiraFont, TermesFont } from './fonts';
import { packages } from './packages';
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

import { render } from './litedom';

type Document = MathDocument<LiteNode, LiteText, LiteDocument>;
type Output = Record<string, OutputJax<LiteNode, LiteText, LiteDocument>>;

export type FontName = keyof Output;

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const doc: Document = mathjax.document('', {
  InputJax: new TeX({ packages }),
});

const output: Output = {
  termes: new SVG({
    fontData: TermesFont,
  }),
  fira: new SVG({
    fontData: FiraFont,
  }),
};

export function toMathJaxString(expr: string, fontName: FontName) {
  doc.outputJax = output[fontName];
  doc.outputJax.setAdaptor(doc.adaptor);
  const node = doc.convert(expr) as LiteElement;
  if ((node.children || []).length === 0) {
    console.log('[mathjax]: node has no children');
    return '';
  }
  const svg = node.children[0] as LiteElement;
  return adaptor.outerHTML(svg);
}

export function toMathJaxJSX(expr: string, fontName: FontName) {
  doc.outputJax = output[fontName];
  doc.outputJax.setAdaptor(doc.adaptor);
  const node = doc.convert(expr) as LiteElement;
  return render(node.children);
}
