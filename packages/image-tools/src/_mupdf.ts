// // import { readFile } from 'fs/promises';
// import { Properties, Root } from 'hast';
// import * as mupdf from 'mupdf';
// import rehype from 'rehype-parse';
// import stringify from 'rehype-stringify';
// // import { optimize } from 'svgo';
// import { unified } from 'unified';
// import { visit } from 'unist-util-visit';

// export async function pdfToSvg(data: Uint8Array<ArrayBuffer>) {
//   // const data = await readFile(filePath);
//   const doc = loadPDF(data);
//   const svg = drawPageAsSVG(doc, 0);
//   return formatSvg(svg);
// }

// function loadPDF(data: Buffer | ArrayBuffer | Uint8Array) {
//   return new mupdf.PDFDocument(data);
// }

// function drawPageAsSVG(
//   document: mupdf.PDFDocument,
//   pageNumber: number,
// ): string {
//   const page = document.loadPage(pageNumber);
//   const buffer = new mupdf.Buffer();
//   const writer = new mupdf.DocumentWriter(buffer, 'svg', '');
//   const device = writer.beginPage(page.getBounds());
//   page.run(device, mupdf.Matrix.identity);
//   device.close();
//   writer.endPage();
//   return buffer.asString();
// }

// async function formatSvg(_str: string) {
//   const str = _str.replace(/svg:/g, '');
//   // const optimised = optimize(str, { multipass: true });
//   const processor = unified()
//     .use(rehype, { fragment: true })
//     .use(addWrapper)
//     .use(stringify);
//   const parsed = await processor.process(str);
//   return String(parsed);
// }

// function addWrapper() {
//   return (tree: Root) => {
//     visit(tree, 'element', (node) => {
//       if (node.tagName === 'svg') {
//         const properties = node.properties || {};
//         node.properties = {
//           xmlns: 'http://www.w3.org/2000/svg',
//           // width: properties.width,
//           // height: properties.height,
//           viewBox: getViewBox(properties),
//         };
//       }
//     });
//   };
// }

// function getViewBox(properties: Properties) {
//   if (properties.viewBox) {
//     return properties.viewBox;
//   }
//   return `0 0 ${properties.width} ${properties.height}`;
// }
