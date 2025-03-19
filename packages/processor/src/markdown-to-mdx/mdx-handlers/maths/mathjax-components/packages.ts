// sort-imports-ignore
import { Loader } from 'mathjax-full/js/components/loader.js';

import 'mathjax-full/components/src/core/core.js';
import 'mathjax-full/components/src/output/svg/lib/svg.js';
import 'mathjax-full/components/src/ui/menu/menu.js';

import 'mathjax-full/components/src/input/tex-base/tex-base.js';
import 'mathjax-full/components/src/input/tex/extensions/ams/ams.js';
import 'mathjax-full/components/src/input/tex/extensions/newcommand/newcommand.js';
import 'mathjax-full/components/src/input/tex/extensions/configmacros/configmacros.js';
import 'mathjax-full/components/src/input/tex/extensions/boldsymbol/boldsymbol.js';
// import 'mathjax-full/components/src/input/tex/extensions/require/require.js';
// import 'mathjax-full/components/src/input/tex/extensions/autoload/autoload.js';

export function loadPackages() {
  Loader.preLoad(
    'loader',
    'startup',

    'core',
    'output/svg',
    'ui/menu',

    'input/tex-base',
    '[tex]/ams',
    '[tex]/newcommand',
    '[tex]/configmacros',
    '[tex]/boldsymbol',
    // '[tex]/require',
    // '[tex]/autoload',

    '[mathjax-termes]/svg',
    '[mathjax-fira]/svg',
  );

  return {
    '[+]': [
      'ams',
      'newcommand',
      'configmacros',
      'boldsymbol',
      // 'require',
      // 'autoload',
    ],
  };
}
