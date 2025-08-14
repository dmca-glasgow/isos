import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js';
import { STATE } from '@mathjax/src/js/core/MathItem.js';
import { SerializedMmlVisitor } from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js';
import { TeX } from '@mathjax/src/js/input/tex.js';
import { mathjax } from '@mathjax/src/js/mathjax.js';

// TeX packages
import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
import '@mathjax/src/js/input/tex/boldsymbol/BoldsymbolConfiguration.js';
import '@mathjax/src/js/input/tex/configmacros/ConfigMacrosConfiguration.js';
import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
import '@mathjax/src/js/input/tex/textcomp/TextcompConfiguration.js';

const adaptor = liteAdaptor();
const visitor = new SerializedMmlVisitor();
RegisterHTMLHandler(adaptor);

const packages = [
  'base',
  'ams',
  'newcommand',
  'configmacros',
  'boldsymbol',
  'textcomp',
];

const mmlDoc = mathjax.document('', {
  InputJax: new TeX({
    packages,
    macros: {
      pounds: '\\textsterling',
    },
  }),
});

export function texToMml(latex: string) {
  const mmlNode = mmlDoc.convert(latex, { end: STATE.CONVERT });
  return visitor.visitTree(mmlNode);
}
