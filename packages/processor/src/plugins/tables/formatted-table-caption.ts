// @ts-expect-error
import parseAttr from 'md-attr-parser';

import {
  parseAttributes,
  serialiseAttributes,
} from '../../parse-attributes';

export function codeToTableCaption(markdown: string) {
  // console.log('codeToTableCaption');
  let open = false;
  return markdown
    .split('\n')
    .map((line) => {
      // console.log({ line });
      if (line.length > 0 && !line.startsWith('`')) {
        open = false;
      }

      if (open && line.length) {
        const match = line.match(/^`:table-caption\[(.*)\](\{.*\})?`\s*$/);
        if (match !== null) {
          const caption = match[1] ? ` ${match[1]}` : '';
          const attributes = match[2] || '';
          return `:${caption} ${attributes}`.trim();
        }
      }

      if (line.startsWith('|')) {
        open = true;
      }

      return line;
    })
    .join('\n');
}

export function tableCaptionToCode(markdown: string) {
  // console.log('tableCaptionToCode');
  let open = false;
  return markdown
    .split('\n')
    .map((line) => {
      // console.log({ line });
      if (line.length > 0 && !line.startsWith(': ')) {
        open = false;
      }

      if (open && line.length) {
        const match = line.match(/^\\?:\s+(.*)$/);
        if (match !== null) {
          const { text, attributes } = parseAttributes(match[1]);
          const attrs = serialiseAttributes(attributes);
          return `\`:table-caption[${text}]${attrs}\``;
        }
      }

      if (line.startsWith('|')) {
        open = true;
      }

      return line;
    })
    .join('\n');
}

export function tableCaptionToDirective(markdown: string) {
  // console.log('tableCaptionToDirective');
  let open = false;
  return markdown
    .split('\n')
    .map((line) => {
      // console.log({ line });
      if (line.length > 0 && !line.startsWith(': ')) {
        open = false;
      }

      if (open && line.length) {
        const match = line.match(/^\\?:\s+(.*)$/);
        if (match !== null) {
          const { text, attributes } = parseAttributes(match[1]);
          const attrs = serialiseAttributes(attributes);
          return `:table-caption[${text}]${attrs}`;
        }
      }

      if (line.startsWith('|')) {
        open = true;
      }

      return line;
    })
    .join('\n');
}

// function extractId(rest: string) {
//   const match = rest.match(/:label\[(.+)\]/);
//   return match === null ? null : match[1];
// }

// export function serialiseAttributes(attributes: Record<string, string>) {
//   const properties = Object.entries(attributes)
//     .reduce((acc, [k, v]) => acc + (v ? getAttribute(k, v) : ''), '')
//     .trim();

//   return properties.length ? `{${properties}}` : '';
// }

// function getAttribute(key: string, value: string) {
//   switch (key) {
//     case 'id':
//       return `#${value} `;
//     case 'class':
//       return `.${value} `;
//     default:
//       return `${key}="${value}" `;
//   }
// }
