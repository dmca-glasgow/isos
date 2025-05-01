// export type Options = {
//   noEmbedAssetUrl: boolean;
//   noSyntaxHighlight: boolean;
// };
import { TheoremsYaml } from '../plugins/theorems-proofs/default-theorems';

// export type Context = {
//   cacheDir: string;
//   hasSidenotes: boolean;
//   figureCounter: number;
//   refStore: Record<string, string>;
//   options: Options;
// };

export type Reference = {
  id: string;
  label: string;
};

export type Context = {
  theorems: TheoremsYaml;
  // refMap: Record<string, Reference>;
  // hasSidenotes: boolean;
};

export function createContext(): Context {
  return {
    theorems: {},
    // refMap: {},
    // hasSidenotes: false,
    // cacheDir: '',
    // hasSidenotes: false,
    // figureCounter: 0,
    // refStore: {},
    // options: {
    //   noEmbedAssetUrl: false,
    //   noSyntaxHighlight: false,
    // },
  };
}
