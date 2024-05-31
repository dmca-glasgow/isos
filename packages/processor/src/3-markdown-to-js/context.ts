export type Options = {
  noEmbedAssetUrl: boolean;
  noSyntaxHighlight: boolean;
};

export type Context = {
  cacheDir: string;
  hasSidenotes: boolean;
  figureCounter: number;
  refStore: Record<string, string>;
  options: Options;
};

export function createContext(): Context {
  return {
    cacheDir: '',
    hasSidenotes: false,
    figureCounter: 0,
    refStore: {},
    options: {
      noEmbedAssetUrl: false,
      noSyntaxHighlight: false,
    },
  };
}
