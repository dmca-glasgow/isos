// https://quarto.org/docs/authoring/cross-references.html#theorems-and-proofs

export type Theorem = {
  name: string;
  heading: string;
  style?: 'plain' | 'definition' | 'remark';
  abbr?: string;
  numberWithin?: string;
  counterWithin?: string;
  referenceCounter?: string;
  unnumbered?: boolean;
};

export const defaultTheorems: Theorem[] = [
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

  // Not theorems, but have similar counter and ref support
  {
    name: 'figure',
    heading: 'Figure',
    abbr: 'fig',
    unnumbered: false,
  },
];

export type TheoremYaml = Partial<Omit<Theorem, 'name'>>;
export type TheoremsYaml = Record<string, TheoremYaml>;

export function createDefaultTheoremsYaml() {
  return defaultTheorems.reduce(
    (acc: TheoremsYaml, { name, ...theorem }) => {
      acc[name] = theorem;
      return acc;
    },
    {},
  );
}

// https://quarto.org/docs/authoring/cross-references.html#callouts

// export const callOuts: Record<string, string> = {
//   nte: 'note',
//   tip: 'tip',
//   wrn: 'warning',
//   imp: 'important',
//   cau: 'caution',
// };
