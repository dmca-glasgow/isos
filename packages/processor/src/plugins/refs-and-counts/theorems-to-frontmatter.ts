import {
  RefObjectYaml,
  RefObjectsYaml,
  defaultObjects,
} from './default-objects';

export function theoremsToFrontmatter(theorems: RefObjectsYaml) {
  return Object.entries(theorems).reduce(
    (acc: RefObjectsYaml, [name, theorem]) => {
      const obj = defaultObjects.find((o) => o.name === name);

      if (obj) {
        const result: RefObjectYaml = {};

        for (const [_key, value] of Object.entries(theorem)) {
          const key = _key as keyof RefObjectYaml;

          // defaults can be omitted
          if (value === obj[key]) {
            continue;
          }

          // unnumbered theorems are given an .unnumbered class
          // so don't need to be recorded in frontmatter
          // if (key === 'unnumbered') {
          //   continue;
          // }

          // @ts-expect-error
          result[key] = value;
        }

        if (Object.keys(result).length > 0) {
          acc[name] = result;
        }
      }

      return acc;
    },
    {},
  );
}
