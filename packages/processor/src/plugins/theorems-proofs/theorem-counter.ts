type Store = Record<string, number>;

export type TheoremCounter = {
  get: (key: string) => number;
  increment: (key: string) => number;
};

export function createTheoremCounter(): TheoremCounter {
  const store: Store = {};
  return {
    get(key: string) {
      return store[key];
    },
    increment(key: string) {
      const value = (store[key] || 0) + 1;
      store[key] = value;
      return value;
    },
  };
}
