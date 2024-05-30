export type Readability = {
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  increment: number;
};

export const fontSize: Readability = {
  label: 'Font-size',
  defaultValue: 1,
  min: 0.6,
  max: 2,
  increment: 0.1,
};

export const lineSpacing: Readability = {
  label: 'Line spacing',
  defaultValue: 1,
  min: 0.6,
  max: 2,
  increment: 0.1,
};

export const letterSpacing: Readability = {
  label: 'Letter spacing',
  defaultValue: 0,
  min: -0.1,
  max: 0.2,
  increment: 0.05,
};

export const lineWidth: Readability = {
  label: 'Line width',
  defaultValue: 1,
  min: 0.6,
  max: 1.2,
  increment: 0.05,
};
