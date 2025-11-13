// // import type { WatchEvent } from '@tauri-apps/plugin-fs';
// import { isNode, isTauri } from './detect-env';

// export async function readBinaryFile(
//   filePath: string,
// ): Promise<Uint8Array> {
//   if (isNode()) {
//     return (await import('./node')).readFile(filePath);
//   } else if (isTauri()) {
//     return (await import('./tauri')).readFile(filePath);
//   }
//   return (await import('./browser')).readFile(filePath);
// }

// export async function readTextFile(filePath: string): Promise<string> {
//   if (isNode()) {
//     return (await import('./node')).readFile(filePath, 'utf-8');
//   } else if (isTauri()) {
//     return (await import('./tauri')).readTextFile(filePath);
//   }
//   return (await import('./browser')).readTextFile(filePath);
// }

// export async function writeTextFile(filePath: string, contents: string) {
//   if (isNode()) {
//     return (await import('./node')).writeTextFile(filePath, contents);
//   } else if (isTauri()) {
//     return (await import('./tauri')).writeTextFile(filePath, contents);
//   }
//   return (await import('./browser')).writeTextFile(filePath, contents);
// }

// // export async function watchImmediate(
// //   filePath: string,
// //   callback: (event: WatchEvent) => unknown,
// // ) {
// //   if (isNode()) {
// //     return (await import('./node')).watchImmediate(filePath, callback);
// //   } else if (isTauri()) {
// //     return (await import('./tauri')).watchImmediate(filePath, callback);
// //   }
// //   return (await import('./browser')).watchImmediate(filePath, callback);
// // }

// type Watcher = {
//   watch: (files: string[], onChange: () => unknown) => Promise<void>;
//   destroy: () => void;
// };

// export async function createWatcher(): Promise<Watcher> {
//   if (isNode()) {
//     return (await import('./node')).createWatcher();
//   } else if (isTauri()) {
//     return (await import('./tauri')).createWatcher();
//   } else {
//     return (await import('./browser')).createWatcher();
//   }
// }
