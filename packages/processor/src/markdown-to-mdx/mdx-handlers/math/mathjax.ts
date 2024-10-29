import { MathJaxFiraFont } from 'mathjax-fira-font/js/svg.js';
import 'mathjax-fira-font/js/svg/dynamic/double-struck.js';
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
import 'mathjax-full/js/input/tex/ams/AmsConfiguration.js';
import 'mathjax-full/js/input/tex/configmacros/ConfigMacrosConfiguration.js';
import 'mathjax-full/js/input/tex/newcommand/NewcommandConfiguration.js';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { MathJaxTermesFont } from 'mathjax-termes-font/js/svg.js';
import 'mathjax-termes-font/js/svg/dynamic/double-struck.js';

import { render } from './litedom';

type Document = MathDocument<LiteNode, LiteText, LiteDocument>;

type Output = Record<string, OutputJax<LiteNode, LiteText, LiteDocument>>;

export type FontName = keyof Output;

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const doc: Document = mathjax.document('', {
  InputJax: new TeX({
    packages: ['base', 'ams', 'newcommand', 'configmacros'],
  }),
});

const TermesFont = new MathJaxTermesFont();
const FiraFont = new MathJaxFiraFont();

const fontPreloads = ['double-struck'];

fontPreloads.forEach((name) => {
  // @ts-expect-error
  MathJaxTermesFont.dynamicFiles[name].setup(TermesFont);
  // @ts-expect-error
  MathJaxFiraFont.dynamicFiles[name].setup(FiraFont);
});

const output: Output = {
  termes: new SVG({
    fontData: TermesFont,
  }),
  fira: new SVG({
    fontData: FiraFont,
  }),
};

export function getMathJax(expr: string, fontName: FontName) {
  doc.outputJax = output[fontName];
  doc.outputJax.setAdaptor(doc.adaptor);
  const node = doc.convert(expr) as LiteElement;
  return render(node.children);
}