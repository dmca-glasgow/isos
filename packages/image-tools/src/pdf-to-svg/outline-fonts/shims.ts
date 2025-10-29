export async function getShims(): Promise<{}> {
  if (process.env.NODE_ENV === 'test') {
    // @ts-expect-error
    return await import('svg-text-to-path/src/shims/node.js');
  } else {
    // @ts-expect-error
    return await import('svg-text-to-path/src/shims/browser.js');
  }
}
