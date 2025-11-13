// mocks

export async function readFile(_filePath: string): Promise<Uint8Array> {
  return new Uint8Array();
}

export async function readTextFile(_filePath: string): Promise<string> {
  return '';
}

export async function writeTextFile(_filePath: string, _contents: string) {
  //
}

// export async function watchImmediate(
//   _filePath: string,
//   _callback: (...args: any[]) => unknown,
// ) {
//   // no need watch in Node.js
//   return () => {};
// }

export function createWatcher() {
  return {
    async watch(_files: string[], _onChange: () => unknown) {
      //
    },
    destroy() {
      //
    },
  };
}
