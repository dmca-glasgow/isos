// sort-imports-ignore
// @ts-expect-error
import { startup } from 'mathjax-full/components/src/startup/init.js';
// @ts-expect-error
import { checkSre } from 'mathjax-full/components/src/a11y/util.js';
// @ts-expect-error
import { OutputUtil } from 'mathjax-full/components/src/output/util.js';
// import { CONFIG } from 'mathjax-full/js/components/loader.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { insert } from 'mathjax-full/js/util/Options.js';
import { MathJaxTermesFont } from 'mathjax-termes-font/js/svg.js';
import { MathJaxFiraFont } from 'mathjax-fira-font/js/svg.js';
import { mathjax } from 'mathjax-full/js/mathjax.js';

import { MathsFont } from '../Maths';
import { loadPackages } from './packages';
import { fonts } from './fonts';

export function loadMathJax(initialMathsFont: MathsFont) {
  // const paths = CONFIG.paths || {};
  // const basePath = 'https://cdn.jsdelivr.net/npm';
  // paths.mathJax = `${basePath}/mathjax@4.0.0-beta.7`;
  // paths['mathjax-termes'] = `${basePath}/mathjax-termes-font`;
  // paths['mathjax-fira'] = `${basePath}/mathjax-fira-font`;

  MathJax.config.startup.typeset = false;

  const packages = loadPackages();
  insert(MathJax.config.tex, { packages });

  MathJax.config.tex.inlineMath = [['$', '$']];

  const output = {
    fonts: {
      'mathjax-fira': { svg_ts: { MathJaxFiraFont } },
      'mathjax-termes': { svg_ts: { MathJaxTermesFont } },
    },
  };
  insert(MathJax._, { output }, false);

  MathJax.setFont = (name: MathsFont) => {
    const html = MathJax.startup.document;
    html.outputJax = fonts[name];
    html.outputJax.setAdaptor(html.adaptor);
    return mathjax.handleRetriesFor(() => html.rerender());
  };

  if (initialMathsFont === 'termes') {
    OutputUtil.config('svg', SVG, 'mathjax-termes', MathJaxTermesFont);
    OutputUtil.loadFont(checkSre(startup), 'svg', 'mathjax-termes', true);
  } else {
    OutputUtil.config('svg', SVG, 'mathjax-fira', MathJaxFiraFont);
    OutputUtil.loadFont(checkSre(startup), 'svg', 'mathjax-fira', true);
  }

  // MathJax.config.svg.scale = 1.25;
}
