export function isNode() {
  return (
    Object.prototype.toString.call(
      typeof process !== 'undefined' ? process : 0,
    ) === '[object process]'
  );
}

export function isTauri() {
  return !!((globalThis as any) || window).isTauri;
}
