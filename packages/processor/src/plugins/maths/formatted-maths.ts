// @ts-expect-error
import parseAttr from 'md-attr-parser';

export function mathsMetaToPandocAttributes(markdown: string) {
  // console.log('mathsMetaToPandocAttributes');
  // console.log(markdown);

  let open: string | null = null;

  const result = markdown
    .split('\n')
    .map((line) => {
      if (open === null) {
        const match = line.match(/^\$\$\s*(\{.+\})\s*$/);
        if (match !== null) {
          open = match[1];
          return `$$`;
        }
        return line;
      } else {
        const match = line.match(/^\$\$\s*$/);
        if (match !== null) {
          const attrs = open;
          open = null;
          return `$$ ${attrs}`;
        }
        return line;
      }
    })
    .join('\n');

  // console.log(result);
  return result;
}

export function pandocAttributesToMathsMeta(markdown: string) {
  // console.log('pandocAttributesToMathsMeta');

  let open: string | null = null;

  return markdown
    .split('\n')
    .reverse()
    .map((line) => {
      if (open === null) {
        const match = line.match(/^\$\$\s*(\{.+\})\s*$/);
        if (match !== null) {
          open = match[1];
          return `$$`;
        }
        return line;
      } else {
        const match = line.match(/^\$\$\s*$/);
        if (match !== null) {
          const attrs = open;
          open = null;
          return `$$${attrs}`;
        }
        return line;
      }
    })
    .reverse()
    .join('\n');
}
