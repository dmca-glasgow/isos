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
