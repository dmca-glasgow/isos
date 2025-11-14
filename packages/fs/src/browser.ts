import { Fs } from './types';

export const fs: Fs = {
  readBinaryFile: readFile,
  readTextFile,
  writeTextFile,
  createWatcher,
};

// mocks

async function readFile(
  _filePath: string,
): Promise<Uint8Array<ArrayBuffer>> {
  return new Uint8Array();
}

async function readTextFile(_filePath: string): Promise<string> {
  return '';
}

async function writeTextFile(_filePath: string, _contents: string) {
  //
}

// async function watchImmediate(
//   _filePath: string,
//   _callback: (...args: any[]) => unknown,
// ) {
//   // no need watch in Node.js
//   return () => {};
// }

function createWatcher() {
  return {
    watch: async () => {},
    destroy: () => {},
  };
}
