// @ts-expect-error
import parseAttr from 'md-attr-parser';

export function altToCaptionAttribute(markdown: string) {
  // console.log('altToCaptionAttribute');
  return markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/^!\[(.+)\]\((.+)\)([^`]*?)\s*$/);
      // console.log(match);
      if (match !== null) {
        const caption = match[1];
        const url = match[2];
        const attrs = parseAttr(match[3]).prop;
        const attributes = serialiseAttributes({ ...attrs, caption });
        return `![](${url})\`${attributes}\``;
      }
      return line;
    })
    .join('\n');
}

export function captionAttributeToAlt(markdown: string) {
  // console.log('captionAttributeToAlt');
  return markdown
    .split('\n')
    .map((line) => {
      // console.log(line);
      const match = line.match(/^!\[(.*)\]\((.+)\)`(.*)`(.*)/);
      if (match !== null) {
        const { caption, ...attrs } = parseAttr(match[3]).prop;

        // replace fig-alt with alt to support Pandoc implicit figures
        // https://github.com/jgm/pandoc/issues/10830
        // https://github.com/quarto-dev/quarto-cli/discussions/12731
        if ('fig-alt' in attrs) {
          attrs.alt = attrs['fig-alt'];
          delete attrs['fig-alt'];
        }

        const id = extractId(match[4]);
        if (id !== null) {
          attrs.id = id;
        }

        const attributes = serialiseAttributes(attrs);

        const url = match[2];
        return `![${caption || ''}](${url})${attributes}`;
      }
      return line;
    })
    .join('\n');
}

function extractId(rest: string) {
  const match = rest.match(/:label\[(.+)\]/);
  return match === null ? null : match[1];
}

export function serialiseAttributes(attributes: Record<string, string>) {
  const properties = Object.entries(attributes)
    .reduce((acc, [k, v]) => acc + (v ? `${k}="${v}" ` : ''), '')
    .trim();

  return properties.length ? `{${properties}}` : '';
}
