// sort-imports-ignore
import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js';
import { MathML } from '@mathjax/src/js/input/mathml.js';
import { mathjax } from '@mathjax/src/js/mathjax.js';
import { SVG } from '@mathjax/src/js/output/svg.js';

import { MathJaxNewcmFont } from '@mathjax/mathjax-newcm-font/js/svg.js';
import '@mathjax/mathjax-newcm-font/js/svg/dynamic/arrows.js';
import '@mathjax/mathjax-newcm-font/js/svg/dynamic/calligraphic.js';
import '@mathjax/mathjax-newcm-font/js/svg/dynamic/double-struck.js';

import { MathJaxFiraFont } from '@mathjax/mathjax-fira-font/js/svg.js';
import '@mathjax/mathjax-fira-font/js/svg/dynamic/arrows.js';
import '@mathjax/mathjax-fira-font/js/svg/dynamic/calligraphic.js';
import '@mathjax/mathjax-fira-font/js/svg/dynamic/double-struck.js';

import { LayoutOptions } from '.';
import { MathsFont, MathsState } from '../../mdx-state';

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const htmlDoc = mathjax.document('', {
  InputJax: new MathML(),
});

const NewcmFont = new MathJaxNewcmFont();
const FiraFont = new MathJaxFiraFont();

const packages = ['arrows', 'calligraphic', 'double-struck'];

packages.forEach((fontPackage) => {
  // @ts-expect-error
  MathJaxNewcmFont.dynamicFiles[fontPackage].setup(NewcmFont);
  // @ts-expect-error
  MathJaxFiraFont.dynamicFiles[fontPackage].setup(FiraFont);
});

const fontOptions = {
  displayOverflow: 'linebreak',
};

const fonts: Record<MathsFont, any> = {
  computerModern: new SVG({ ...fontOptions, fontData: NewcmFont }),
  fira: new SVG({ ...fontOptions, fontData: FiraFont }),
};

export function mmlToSvg(
  mml: string,
  options: MathsState,
  layoutOptions: LayoutOptions,
) {
  htmlDoc.outputJax = fonts[options.mathsFontName.value];
  htmlDoc.outputJax.setAdaptor(htmlDoc.adaptor);

  const htmlNode = htmlDoc.convert(mml, {
    containerWidth: layoutOptions.containerWidth,
    // overflow: 'linebreak',
  });
  const svg = htmlNode.children[0];

  const html = adaptor.outerHTML(svg);

  const match = html.match(/data-mjx-error="(.*?)"/);
  if (match !== null) {
    console.log('mathjax error:', match[1]);
    return `<span class="mathjax-error">${match[1]}</span>`;
  }

  return html;
}
