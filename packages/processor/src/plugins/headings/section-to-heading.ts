export function latexSectionToDepth(section: string) {
  switch (section) {
    case 'section':
      return 2;
    case 'subsection':
      return 3;
    case 'subsubsection':
      return 4;
    case 'paragraph':
      return 5;
    case 'subparagraph':
      return 6;
    default:
      throw new Error(`latex section "${section}" is not supported`);
  }
}
