import watch, { Watcher } from 'node-watch';
import { readFile, writeFile } from 'node:fs/promises';

import { Fs } from './types';

export const fs: Fs = {
  readBinaryFile: readFile,
  readTextFile,
  writeTextFile,
  createWatcher,
};

async function readTextFile(filePath: string): Promise<string> {
  return readFile(filePath, 'utf-8');
}

async function writeTextFile(filePath: string, contents: string) {
  return writeFile(filePath, contents, 'utf-8');
}

// async function watchImmediate(
//   filePath: string,
//   callback: (...args: any[]) => unknown,
// ) {
//   // no need watch in Node.js
//   return () => {};
// }

export function createMockWatcher() {
  return {
    watch: async () => {},
    destroy: () => {},
  };
}

// deleted files aren't detected when added back, because the watcher
// is closed when the file is removed, so watch the parent directory instead.
function createWatcher(_filePath: string, onChange: () => unknown) {
  let watcher: Watcher | null = null;

  return {
    async watch(files: string[]) {
      if (watcher !== null) {
        watcher.close();
      }
      const first = files[0];
      const dir = first.slice(0, first.lastIndexOf('/') + 1);
      watcher = watch(dir, { recursive: true });
      // log.info(`watching: ${dir}`);

      watcher.on('change', (_action, fp) => {
        if (files.includes(String(fp))) {
          // log.info(`changed: ${fp}`);
          onChange();
        }
      });

      watcher.on('error', (err) => {
        console.log(err);
        // log.error(`error: ${err.message}`);
      });
    },
    destroy() {
      if (watcher !== null) {
        watcher.close();
      }
    },
  };
}

// better for files referenced outside the filePath directory
// TODO can probably combine both techniques.

// function createWatchers(filePath: string, onChange: () => unknown) {
//   let watchers: Watcher[] = []
//   return {
//     watch(files: string[]) {
//       watchers.map((w) => w.close()).splice(0, watchers.length);

//       for (const fp of [filePath, ...files]) {
//         log.info(`watching: ${fp}`);
//         const watcher = watch(fp)

//         watcher.on('change', (_action, fp) => {
//           log.info(`changed: ${fp}`);
//           onChange();
//         });

//         watcher.on('error', (err) => {
//           log.error(`error: ${err.message}`);
//         });

//         watchers.push(watcher)
//       }
//     },
//     destroy() {
//       watchers.map((w) => w.close())
//     },
//   };
// }
