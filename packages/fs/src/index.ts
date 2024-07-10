export async function readBinaryFile(
  filePath: string
): Promise<Uint8Array> {
  if (process.env.NODE_ENV === 'test') {
    const { readFile } = await import('fs/promises');
    return readFile(filePath);
  } else {
    const { readBinaryFile: r } = await import('@tauri-apps/api/fs');
    return r(filePath);
  }
}

export async function readTextFile(filePath: string): Promise<string> {
  if (process.env.NODE_ENV === 'test') {
    const { readFile } = await import('fs/promises');
    return readFile(filePath, 'utf-8');
  } else {
    const { readTextFile: r } = await import('@tauri-apps/api/fs');
    return r(filePath);
  }
}
