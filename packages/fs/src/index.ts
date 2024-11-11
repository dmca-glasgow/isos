import { WatchEvent } from '@tauri-apps/plugin-fs';

export async function readBinaryFile(
  filePath: string,
): Promise<Uint8Array> {
  if (process.env.NODE_ENV === 'test') {
    return (await import('fs/promises')).readFile(filePath);
  } else {
    return (await import('@tauri-apps/plugin-fs')).readFile(filePath);
  }
}

export async function readTextFile(filePath: string): Promise<string> {
  if (process.env.NODE_ENV === 'test') {
    return (await import('fs/promises')).readFile(filePath, 'utf-8');
  } else {
    return (await import('@tauri-apps/plugin-fs')).readTextFile(filePath);
  }
}

export async function writeTextFile(filePath: string, contents: string) {
  if (process.env.NODE_ENV === 'test') {
    return (await import('fs/promises')).writeFile(
      filePath,
      contents,
      'utf-8',
    );
  } else {
    return (await import('@tauri-apps/plugin-fs')).writeTextFile(
      filePath,
      contents,
    );
  }
}

export async function watchImmediate(
  filePath: string,
  callback: (event: WatchEvent) => unknown,
) {
  if (process.env.NODE_ENV === 'test') {
    // no need for this functionality outside Tauri app
    return () => {};
  } else {
    return (await import('@tauri-apps/plugin-fs')).watchImmediate(
      filePath,
      callback,
    );
  }
}
