export type RefObject = {
  name: string;
  heading: string;
  style?: 'plain' | 'definition' | 'remark';
  abbr?: string;
  numberWithin?: string;
  counterWithin?: string;
  referenceCounter?: string;
  unnumbered?: boolean;
};

export const defaultObjects: RefObject[] = [
  // Theorems & Proofs
  // https://quarto.org/docs/authoring/cross-references.html#theorems-and-proofs
  {
    name: 'theorem',
    heading: 'Theorem',
    style: 'definition',
    abbr: 'thm',
    unnumbered: false,
  },
  {
    name: 'lemma',
    heading: 'Lemma',
    style: 'definition',
    abbr: 'lem',
    unnumbered: false,
  },
  {
    name: 'corollary',
    heading: 'Corollary',
    style: 'definition',
    abbr: 'cor',
    unnumbered: false,
  },
  {
    name: 'proposition',
    heading: 'Proposition',
    style: 'definition',
    abbr: 'prp',
    unnumbered: false,
  },
  {
    name: 'conjecture',
    heading: 'Conjecture',
    style: 'definition',
    abbr: 'cnj',
    unnumbered: false,
  },
  {
    name: 'definition',
    heading: 'Definition',
    style: 'definition',
    abbr: 'def',
    unnumbered: false,
  },
  {
    name: 'example',
    heading: 'Example',
    style: 'definition',
    abbr: 'exm',
    unnumbered: false,
  },
  {
    name: 'exercise',
    heading: 'Exercise',
    style: 'definition',
    abbr: 'exr',
    unnumbered: false,
  },
  {
    name: 'solution',
    heading: 'Solution',
    style: 'remark',
    abbr: 'sol',
    unnumbered: false,
  },
  {
    name: 'remark',
    heading: 'Remark',
    style: 'remark',
    abbr: 'rem',
    unnumbered: false,
  },
  {
    name: 'proof',
    heading: 'Proof',
    style: 'remark',
  },
  // equation
  {
    name: 'equation',
    heading: 'Equation',
    abbr: 'eq',
    unnumbered: false,
  },
  // floats
  {
    name: 'figure',
    heading: 'Figure',
    abbr: 'fig',
    unnumbered: false,
  },
  {
    name: 'table',
    heading: 'Table',
    abbr: 'tbl',
    unnumbered: false,
  },
  {
    name: 'section',
    heading: 'Section',
    abbr: 'sec',
    unnumbered: false,
  },
  // TODO: listing
  // https://quarto.org/docs/authoring/cross-references-divs.html#listings
  // {
  //   name: 'listing',
  //   heading: 'Listing',
  //   abbr: 'lst',
  //   unnumbered: false,
  // },
];

export type RefObjectYaml = Partial<Omit<RefObject, 'name'>>;
export type RefObjectsYaml = Record<string, RefObjectYaml>;

export function createDefaultObjectsYaml() {
  return defaultObjects.reduce((acc: RefObjectsYaml, { name, ...obj }) => {
    acc[name] = obj;
    return acc;
  }, {});
}

// https://quarto.org/docs/authoring/cross-references.html#callouts

// export const callOuts: Record<string, string> = {
//   nte: 'note',
//   tip: 'tip',
//   wrn: 'warning',
//   imp: 'important',
//   cau: 'caution',
// };
