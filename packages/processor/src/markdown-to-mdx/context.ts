// export type Options = {
//   noEmbedAssetUrl: boolean;
//   noSyntaxHighlight: boolean;
// };
import { RefObjectsYaml } from '../plugins/refs-and-counts/default-objects';

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
  theorems: RefObjectsYaml;
  refMap: Record<string, Reference>;
  hasSideNotes: boolean;
};

export function createContext(): Context {
  return {
    theorems: {},
    refMap: {},
    hasSideNotes: false,
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
