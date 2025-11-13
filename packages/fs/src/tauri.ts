import {
  readFile,
  readTextFile,
  watchImmediate,
  writeTextFile,
} from '@tauri-apps/plugin-fs';

import { Fs } from './types';

export const fs: Fs = {
  readBinaryFile: readFile,
  readTextFile,
  writeTextFile,
  createWatcher,
};

function createWatcher(_filePath: string, onChange: () => unknown) {
  const watchers: (() => void)[] = [];

  // destroy previous watchers by calling them
  // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
  function destroy() {
    watchers.map((fn) => fn()).splice(0, watchers.length);
  }

  return {
    async watch(files: string[]) {
      destroy();

      for (const file of files) {
        try {
          const watcher = await watchImmediate(
            file,
            (event) => {
              // can be of type 'any' or 'other'
              if (typeof event.type === 'string') {
                return;
              }
              const type = event.type as Record<string, any>;
              if (
                type.create?.kind === 'file' ||
                type.modify?.kind === 'data'
              ) {
                onChange();
              }
            },
            { recursive: false },
          );
          watchers.push(watcher);
        } catch (err: any) {
          console.log('[file watcher]:', String(err));
        }
      }
    },
    destroy,
  };
}
