import { Element, Properties, Root, Text } from 'hast';
import rehype from 'rehype-parse';
import stringify from 'rehype-stringify';
// import { optimize } from 'svgo';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { optimiseBitmap } from '../../optimise-bitmap';
import { getPdfJs } from './pdfjs';

// https://github.com/mozilla/pdf.js/releases/tag/v2.14.305
// These files depend on pdfjs-dist@2.14.305 which is the
// last version of pdfjs I've found that can convert PDF
// graphics to SVG in Node and in the browser. (SVG support
// was dropped leaving only Canvas.. probably for
// good reasons I haven't come across yet).

// https://bugzilla.mozilla.org/show_bug.cgi?id=1893645
// https://github.com/isos-tools/isos/security/dependabot/95
// This version of pdfjs has a known vulnerability.
// I have set the "isEvalSupported" option to false as
// advised by dependabot.

// https://bundlephobia.com/package/pdfjs-dist@2.14.305
// 227.3kB minified

// https://mupdf.readthedocs.io/en/latest/license.html
// MuPDF is another option but has licensing complications

export async function pdfToSvg(data: ArrayBufferView) {
  const { SVGGraphics, getDocument } = await getPdfJs();
  const doc = await getDocument({
    data: data instanceof Uint8Array ? data : new Uint8Array(data.buffer),
    isEvalSupported: false,
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
    .use(inlineImages)
    .use(stringify);

  const parsed = processor.parse(str);
  const transformed = await processor.run(parsed);
  const fonts = await extractFonts(transformed as Root);
  const svg = processor.stringify(transformed as Root);
  // console.log(svg);
  return { svg, fonts };
}

function addWrapper() {
  return (tree: Root) => {
    // console.dir(tree, { depth: null });
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

function inlineImages() {
  return async (tree: Root) => {
    const nodes: Element[] = [];

    visit(tree, 'element', (node) => {
      if (node.tagName === 'image') {
        if (node.properties.xLinkHref) {
          const href = node.properties.xLinkHref;
          delete node.properties.xLinkHref;
          node.properties.href = href;
        }
        nodes.push(node);
      }
    });

    for (const node of nodes) {
      const href = node.properties.href as string;
      const { buffer } = await objectUrlToBuffer(
        href.replace(/^blob:/, ''),
      );
      const base64 = await optimiseBitmap(buffer);
      node.properties.href = base64;
    }
  };
}

type Fonts = Record<string, ArrayBuffer>;

async function extractFonts(tree: Root) {
  const regex =
    /@font-face\s{\sfont-family:\s"(.+)";\ssrc:\surl\(blob:(.+?)\);\s\}/g;
  const nodes: Element[] = [];

  visit(tree, 'element', (node) => {
    if (
      node.tagName === 'style' &&
      node.children.length > 0 &&
      node.children[0].type === 'text'
    ) {
      nodes.push(node);
    }
  });

  const fonts: Fonts = {};

  for (const node of nodes) {
    const text = node.children[0] as Text;
    const css = text.value || '';
    const matches = css.matchAll(regex);
    for (const match of matches) {
      const id = match[1];
      const url = match[2];
      const { buffer } = await objectUrlToBuffer(url);
      fonts[id] = buffer;
    }
    text.value = css.replace(regex, '');
  }

  return fonts;
}

async function objectUrlToBuffer(url: string) {
  const res = await fetch(`blob:${url}`);
  return {
    mime: res.headers.get('Content-Type'),
    buffer: await res.arrayBuffer(),
  };
}

function getViewBox(properties: Properties) {
  if (properties.viewBox) {
    return properties.viewBox;
  }
  return `0 0 ${properties.width} ${properties.height}`;
}
