import { PDFDocumentLoadingTask } from 'pdfjs-dist';

type Pdfjs = {
  getDocument: (o: any) => PDFDocumentLoadingTask;
  SVGGraphics: (a: any, b: any) => SVGGraphicsElement;
};

export async function getPdfJs(): Promise<Pdfjs> {
  const pdfjs = await getPackage();
  return {
    getDocument: pdfjs.getDocument,
    SVGGraphics: pdfjs.SVGGraphics,
  };
}

async function getPackage(): Promise<any> {
  if (process.env.NODE_ENV === 'test') {
    const SandboxedModule = await import('sandboxed-module');
    // @ts-expect-error
    const { Element, Image, document } = await import('./dom-stubs.js');
    return SandboxedModule.default.require(
      'pdfjs-dist/legacy/build/pdf.js',
      {
        globals: {
          document,
          Image,
          Element,
          Blob,
          console,
          process,
          URL,
        },
      },
    );
  } else {
    const pdfjsLib = await import('pdfjs-dist');
    const pdfWorker = await import(
      'pdfjs-dist/build/pdf.worker.min.js?url'
    );
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;
    return pdfjsLib;
  }
}
