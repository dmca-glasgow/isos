import { Properties, Root } from 'hast';
import rehype from 'rehype-parse';
import stringify from 'rehype-stringify';
import SandboxedModule from 'sandboxed-module';
import { optimize } from 'svgo';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// @ts-expect-error
import { Element, Image, document } from './domstubs';

// https://github.com/mozilla/pdf.js/releases/tag/v2.14.305
// These files bring in pdfjs-dist@2.14.305 which is the
// last version of pdfjs I've found that can convert PDF
// graphics to SVGs in Node.js (canvas is supported and SVG
// was removed).  Perhaps canvas and/or png conversion
// should be explored.

// https://bundlephobia.com/package/pdfjs-dist@2.14.305
// This solution while more awkward is 227.3kB minfied,
// mupdf's .wasm file is over 10MB (unminified).

// Since this will never be necessary in the runtime bundle,
// perhaps the large bundle size doesn't matter, but trying
// it out to find it's limitations before adopting MuPDF.

const pdfjsLib = SandboxedModule.require('./pdf', {
  globals: {
    document,
    Image,
    Element,
    Blob,
    console,
    process,
    URL,
  },
});

export async function pdfToSvg(data: Uint8Array<ArrayBuffer>) {
  const doc = await pdfjsLib.getDocument({
    data: new Uint8Array(data),
    fontExtraProperties: true,
    verbosity: 0,
  }).promise;

  const page = await doc.getPage(1);
  const opList = await page.getOperatorList();
  const viewport = page.getViewport({ scale: 1.0 });

  const svgGfx = new pdfjsLib.SVGGraphics(page.commonObjs, page.objs);
  svgGfx.embedFonts = true;
  const svg = await svgGfx.getSVG(opList, viewport);
  return formatSvg(svg.toString());
}

async function formatSvg(_str: string) {
  const str = _str.replace(/svg:/g, '');
  const optimised = optimize(str, { multipass: true });
  const processor = unified()
    .use(rehype, { fragment: true })
    .use(addWrapper)
    .use(stringify);
  const parsed = await processor.process(optimised.data);
  // const transformed = (await processor.run(parsed)) as Parent;
  // const firstChild = transformed.children[0] as Root;
  return String(parsed);
}

function addWrapper() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'svg') {
        const properties = node.properties || {};
        node.properties = {
          // width: properties.width,
          // height: properties.height,
          viewBox: getViewBox(properties),
        };
      }
    });
  };
}

function getViewBox(properties: Properties) {
  if (properties.viewBox) {
    return properties.viewBox;
  }
  return `0 0 ${properties.width} ${properties.height}`;
}
