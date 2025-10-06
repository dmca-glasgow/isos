import { outlineFonts } from './outline-fonts';
import { pdfToSvg as _pdfToSvg } from './pdfjs';

export { optimiseBitmap } from './optimise-bitmap';

export async function pdfToSvg(data: Uint8Array<ArrayBufferLike>) {
  return outlineFonts(await _pdfToSvg(data));
}
