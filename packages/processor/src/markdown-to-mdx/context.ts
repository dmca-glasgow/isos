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

export type Author = {
  name: string;
  orcid?: string;
  affiliation?: string;
};

export type Frontmatter = {
  title: string;
  date: string;
  author: Author | Author[];
  abstract: string;
  theorems: RefObjectsYaml;
  'reference-location': string;
};

export type Context = {
  frontmatter: {
    title: string;
    date: string;
    author: Author[];
    abstract: string;
    theorems: RefObjectsYaml;
    refMap: Record<string, Reference>;
    referenceLocation: string;
  };
  hasSideNotes: boolean;
};

export function createContext(): Context {
  return {
    frontmatter: {
      title: '',
      date: '',
      author: [],
      abstract: '',
      theorems: {},
      refMap: {},
      referenceLocation: 'margin',
    },
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
