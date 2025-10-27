import {
  RefObject,
  defaultObjects,
} from '../refs-and-counts/default-objects';

// https://quarto.org/docs/authoring/cross-references-divs.html
const names = ['figure', 'table', 'listing'];

export const defaultFloats: RefObject[] = defaultObjects.filter((o) => {
  return names.includes(o.name);
});

// https://quarto.org/docs/authoring/cross-references.html#callouts

// export const callOuts: Record<string, string> = {
//   nte: 'note',
//   tip: 'tip',
//   wrn: 'warning',
//   imp: 'important',
//   cau: 'caution',
// };
