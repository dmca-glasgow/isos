import { Properties, Root } from 'hast';
import rehype from 'rehype-parse';
import stringify from 'rehype-stringify';
// import { optimize } from 'svgo';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { getPdfJs } from './pdfjs';

const { SVGGraphics, getDocument } = await getPdfJs();

export async function pdfToSvg(data: Uint8Array<ArrayBuffer>) {
  const doc = await getDocument({
    data: new Uint8Array(data),
    fontExtraProperties: true,
    verbosity: 0,
  }).promise;

  const page = await doc.getPage(1);
  const opList = await page.getOperatorList();
  const viewport = page.getViewport({ scale: 1.0 });

  // @ts-expect-error
  const svgGfx = new SVGGraphics(page.commonObjs, page.objs);
  svgGfx.embedFonts = true;
  const svg = await svgGfx.getSVG(opList, viewport);
  const svgStr =
    process.env.NODE_ENV === 'test' ? svg.toString() : svg.outerHTML;

  return formatSvg(svgStr);
}

async function formatSvg(_str: string) {
  const str = _str.replace(/svg:/g, '');
  // const optimised = optimize(str, { multipass: true });
  const processor = unified()
    .use(rehype, { fragment: true })
    .use(addWrapper)
    .use(stringify);
  const parsed = await processor.process(str);
  return String(parsed);
}

function addWrapper() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'svg') {
        const properties = node.properties || {};
        node.properties = {
          xmlns: 'http://www.w3.org/2000/svg',
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
