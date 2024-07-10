export type TheoremOptions = {
  heading: string;
  numberWithin?: string;
  referenceCounter?: string;
};

export type Theorems = Record<string, TheoremOptions>;
