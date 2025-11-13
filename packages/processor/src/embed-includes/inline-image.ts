import mimes from 'mime/lite';
import { basename, extname } from 'pathe';

// import { readBinaryFile } from '@isos/fs';
import { optimiseBitmap, pdfToSvg } from '@isos/image-tools';

export const supportedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

export async function getDataUrl(
  imagePath: string,
  data: ArrayBufferView,
) {
  try {
    return {
      error: false,
      data: await getDataUrlForExtension(imagePath, data),
    };
  } catch (err) {
    // console.log('image to data url:', err);
    return {
      error: true,
      data: `${basename(imagePath)}: ${err}`,
    };
  }
}

async function getDataUrlForExtension(
  imagePath: string,
  data: ArrayBufferView,
) {
  const ext = extname(imagePath);
  // console.log(ext);
  switch (ext) {
    case '.pdf': {
      const mime = mimes.getType('.svg') as string;
      const svg = await pdfToSvg(data);
      // console.log(svg);
      const base64 = btoa(svg);
      return toUrl(mime, base64);
    }
    case '.jpg':
    case '.jpeg':
    case '.png': {
      return optimiseBitmap(data.buffer as ArrayBuffer);
    }
    default:
      throw new Error(`unsupported file extension "${ext}"`);
  }
}

function toUrl(mime: string, base64: string) {
  return `data:${mime};base64,${base64}`;
}
