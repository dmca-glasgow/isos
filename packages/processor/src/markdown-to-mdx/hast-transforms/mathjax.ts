// import mathjaxSvg from 'rehype-mathjax/svg';
import { Options } from '../options';
import mathjaxBrowser from 'rehype-mathjax/browser';
import mathjaxChtml from 'rehype-mathjax/chtml';
import { Pluggable } from 'unified';

const mathjaxOptions = {
  chtml: {
    // minScale: 0.8,
    fontURL:
      'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
  },
  tex: {
    inlineMath: [
      ['$', '$'],
      // ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      // [`\\[`, `\\]`],
    ],
  },
};

export function mathjax(options: Partial<Options>): Pluggable {
  if (options.mathsAsTex) {
    return [mathjaxBrowser, mathjaxOptions];
  } else {
    return [mathjaxChtml, mathjaxOptions];
  }
}
