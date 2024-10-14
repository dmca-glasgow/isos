import type { LiteDocument } from 'mathjax-full/js/adaptors/lite/Document.js';
import type { LiteNode } from 'mathjax-full/js/adaptors/lite/Element.js';
import type { LiteText } from 'mathjax-full/js/adaptors/lite/Text.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
// import { STATE } from 'mathjax-full/js/core/MathItem.js';
// import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode.js';
// import { SerializedMmlVisitor } from 'mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js';
import { HTMLDocument } from 'mathjax-full/js/handlers/html/HTMLDocument.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';

import { render } from './litedom';

export type Document = HTMLDocument<LiteNode, LiteText, LiteDocument>;

let cache: Document | null = null;

function getConverter(): Document {
  if (cache !== null) {
    return cache;
  }

  const document = new HTMLDocument('', liteAdaptor(), {
    mathjax: {
      asyncLoad: async (name: string) => import(`${name}.js`),
    },
    InputJax: new TeX({
      packages: ['base'],
      // tags: 'ams',
      // Allow single $ delimiters
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      displayMath: [
        ['$$', '$$'],
        [`\\[`, `\\]`],
      ],
    }),
    OutputJax: new SVG({
      // font: 'mathjax-fira',
    }),
  });
  // const visitor = new SerializedMmlVisitor();
  // const toMathML = (node: MmlNode) => visitor.visitTree(node);

  // const converter = {
  //   convert(expr: string) {
  //     const node = document.convert(expr);
  //     return node;
  //   },
  // };

  cache = document;
  return document;
}

export interface MathjaxProps {
  expr: string;
  document?: Document;
}

type Props = {
  expr: string;
};

export function MathJax({ expr }: Props) {
  // console.log('hey!');
  const converter = getConverter();
  // console.log(converter);
  const node = converter.convert(expr);
  // console.log(node);
  // return null;
  const children = render(node.children);
  return <>{children}</>;
}
