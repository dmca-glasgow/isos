export type Watcher = {
  watch: (files: string[]) => Promise<void>;
  destroy: () => void;
};

export type Fs = {
  readBinaryFile: (filePath: string) => Promise<Uint8Array<ArrayBuffer>>;
  readTextFile: (filePath: string) => Promise<string>;
  writeTextFile: (filePath: string, contents: string) => Promise<void>;
  createWatcher: (filePath: string, onChange: () => unknown) => Watcher;
};
