export type Attributes = {
  id: string;
  classes: string[];
};

export type ParsedAttributes = {
  text: string;
  attributes: Attributes;
};

const pattern = /^(.*)\{(.+)\}$/;

export function hasAttributes(str: string) {
  return pattern.test(str);
}

export function parseAttributes(attributeStr: string): ParsedAttributes {
  const match = attributeStr.match(pattern);

  const defaultAttributes = {
    id: '',
    classes: [],
  };

  if (match === null) {
    return {
      text: attributeStr,
      attributes: defaultAttributes,
    };
  }

  const attributes = match[2].split(' ').reduce((acc: Attributes, str) => {
    if (str.startsWith('#')) {
      acc.id = str.slice(1);
    }
    if (str.startsWith('.')) {
      const classes = str.slice(1).split('.');
      acc.classes.push(...classes);
    }
    return acc;
  }, defaultAttributes);

  return {
    text: match[1].trim(),
    attributes,
  };
}

export function serialiseAttributes(attributes: Partial<Attributes>) {
  const id = attributes.id ? `#${attributes.id}` : '';
  const classes = (attributes.classes || []).map((s) => `.${s}`).join('');
  const both = `${id} ${classes}`.trim();
  return `{${both}}`;
}
