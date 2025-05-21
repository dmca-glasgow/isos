// sort-imports-ignore
import { SVG } from 'mathjax-full/js/output/svg.js';
import type { OutputJax } from 'mathjax-full/js/core/OutputJax.js';

// Termes
import { MathJaxTermesFont } from 'mathjax-termes-font/js/svg.js';
import 'mathjax-termes-font/js/svg/dynamic/arrows.js';
import 'mathjax-termes-font/js/svg/dynamic/double-struck.js';

// Fira
import { MathJaxFiraFont } from 'mathjax-fira-font/js/svg.js';
import 'mathjax-fira-font/js/svg/dynamic/arrows.js';
import 'mathjax-fira-font/js/svg/dynamic/double-struck.js';

import { MathsFont } from '../Maths';

type Output = OutputJax<HTMLElement, Text, Document>;

type Fonts = Record<MathsFont, Output>;

export const fonts: Partial<Fonts> = {
  fira: new SVG({
    ...MathJax.config.svg,
    font: '[mathjax-fira]',
    dynamicPrefix: '[mathjax-fira]/svg/dynamic',
    fontData: MathJaxFiraFont,
  }),
  termes: new SVG({
    ...MathJax.config.svg,
    font: '[mathjax-termes]',
    dynamicPrefix: '[mathjax-termes]/svg/dynamic',
    fontData: MathJaxTermesFont,
  }),
};

const fontPackages = ['double-struck', 'arrows'];

fontPackages.forEach((fontPackage) => {
  // @ts-expect-error
  MathJaxTermesFont.dynamicFiles[fontPackage].setup(fonts.termes.font);
  // @ts-expect-error
  MathJaxFiraFont.dynamicFiles[fontPackage].setup(fonts.fira.font);
});
