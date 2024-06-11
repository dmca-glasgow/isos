import { Theorems } from './latexast-transforms/extract-theorem-definitions';

export type Context = {
  frontmatter: {
    theorems: Theorems;
  };
};

export function createContext(): Context {
  return {
    frontmatter: {
      theorems: {},
    },
  };
}
