export type Context = {
  fileContents: string;
  hasSidenotes: boolean;
  preamble: string;
};

const defaultContext = {
  fileContents: '',
  hasSidenotes: false,
  preamble: '',
};

export function createContext(ctx: Partial<Context>): Context {
  return { ...defaultContext, ...ctx };
}
