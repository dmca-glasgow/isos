export type Options = {
  noEmbedAssetUrl: boolean;
  noSyntaxHighlight: boolean;
};

export type Context = {
  cacheDir: string;
  hasSidenotes: boolean;
  figureCounter: number;
  options: Options;
};

export function createContext(): Context {
  return {
    cacheDir: '',
    hasSidenotes: false,
    figureCounter: 0,
    options: {
      noEmbedAssetUrl: false,
      noSyntaxHighlight: false,
    },
  };
}
