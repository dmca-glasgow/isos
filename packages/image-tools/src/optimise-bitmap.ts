import { Jimp } from 'jimp';

export async function optimiseBitmap(
  img: Uint8Array<ArrayBufferLike> | ArrayBuffer,
  maxSize = 800,
  quality = 75,
) {
  //@ts-expect-error
  const image = await Jimp.fromBuffer(img);
  // console.log(image.mime);

  // resize
  const { width, height } = image.bitmap;
  const maxSide = width >= height ? 'width' : 'height';
  if (image.bitmap[maxSide] > maxSize) {
    const side = maxSide.slice(0, 1) as 'w' | 'h';
    const opts = {
      [side]: maxSize,
    };
    //@ts-expect-error
    image.resize(opts);
  }
  //@ts-expect-error
  return image.getBase64(image.mime, { quality });

  // without Jimp, works but for some reason the file size is 35x larger!
  // const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  // node.properties.href = `data:${mime};base64,${base64}`;
}
