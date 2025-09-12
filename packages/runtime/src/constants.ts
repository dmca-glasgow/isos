export const rootEl = document.querySelector('#root')! as HTMLElement;

export const sidebarWidth = '18rem';

export const scrollbarSize = '12px';
export const scrollbarBorderSize = '3px';

export const sideNoteWidth = '20vw';
export const sideNoteGap = '4vw';

export const actions = Object.freeze({
  y: '1.2rem',
  x: '1.5rem',
  height: '1.4em',
});

// strings make sense when setting these values in html
export type ViewOptionsParam = Readonly<{
  label: string;
  base: string;
  initial: string;
  min: string;
  max: string;
  increment: string;
}>;

export const lineWidth: ViewOptionsParam = Object.freeze({
  label: 'Line width',
  base: '80vw',
  initial: '1',
  min: '0.6',
  max: '1.25',
  increment: '0.01',
});

export const mobileLineWidthBase = '85vw';

export const fontSize: ViewOptionsParam = Object.freeze({
  label: 'Font-size',
  base: '1em',
  initial: '1',
  min: '0.45',
  max: '2',
  increment: '0.01',
});

export const lineHeight: ViewOptionsParam = Object.freeze({
  label: 'Line height',
  base: '1.7',
  initial: '1',
  min: '0.7',
  max: '2',
  increment: '0.1',
});

export const letterSpacing: ViewOptionsParam = Object.freeze({
  label: 'Letter spacing',
  base: '1em',
  initial: '0',
  min: '-0.1',
  max: '0.2',
  increment: '0.01',
});

export const contrast: ViewOptionsParam = Object.freeze({
  label: 'Contrast',
  base: '1',
  initial: '1',
  min: '0.5',
  max: '1.15',
  increment: '0.01',
});

export const brightness: ViewOptionsParam = Object.freeze({
  label: 'Brightness',
  base: '1',
  initial: '1',
  min: '0.2',
  max: '1.5',
  increment: '0.01',
});

export const colourOptions = Object.freeze([
  'White',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Pink',
  'Orange',
]);
