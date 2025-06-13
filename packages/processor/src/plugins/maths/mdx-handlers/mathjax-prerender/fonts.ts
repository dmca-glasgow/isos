import { MathJaxFiraFont } from 'mathjax-fira-font/js/svg.js';

import 'mathjax-fira-font/js/svg/dynamic/arrows.js';
import 'mathjax-fira-font/js/svg/dynamic/calligraphic.js';
import 'mathjax-fira-font/js/svg/dynamic/double-struck.js';

import { MathJaxTermesFont } from 'mathjax-termes-font/js/svg.js';

import 'mathjax-termes-font/js/svg/dynamic/arrows.js';
import 'mathjax-termes-font/js/svg/dynamic/calligraphic.js';
import 'mathjax-termes-font/js/svg/dynamic/double-struck.js';

export const TermesFont = new MathJaxTermesFont();
export const FiraFont = new MathJaxFiraFont();

const fontPackages = ['arrows', 'calligraphic', 'double-struck'];

fontPackages.forEach((fontPackage) => {
  // @ts-expect-error
  MathJaxTermesFont.dynamicFiles[fontPackage].setup(TermesFont);
  // @ts-expect-error
  MathJaxFiraFont.dynamicFiles[fontPackage].setup(FiraFont);
});
