// import { pdfToSvg } from './pdfjs';

export { pdfToSvg } from './pdfjs';

// https://github.com/mozilla/pdf.js/releases/tag/v2.14.305
// These files bring in pdfjs-dist@2.14.305 which is the
// last version of pdfjs I've found that can convert PDF
// graphics to SVGs in Node.js (SVG support was removed).
// Perhaps canvas and/or png conversion should be explored.

// https://bundlephobia.com/package/pdfjs-dist@2.14.305
// This solution while is more awkward, it's 227.3kB minfied,
// mupdf's .wasm file is over 10MB (unminified).

// Since this will never be necessary in the runtime bundle,
// perhaps the large bundle size doesn't matter, but I'm trying
// it out to find it's limitations before adopting MuPDF.

// const svg = await pdfToSvg('/path/to/my.pdf');

// console.log(svg);
