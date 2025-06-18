import {
  RefObject,
  RefObjectYaml,
  RefObjectsYaml,
  defaultObjects,
} from './default-objects';

export function theoremsToFrontmatter(theorems: RefObjectsYaml) {
  // const {theorems} = ctx.frontmatter
  // console.log(ctx.frontmatter.theorems);
  return Object.entries(theorems).reduce(
    (acc: RefObjectsYaml, [name, theorem]) => {
      const obj = defaultObjects.find((o) => o.name === name);
      // console.log(obj);

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

          result[key] = value;
        }

        if (Object.keys(result).length > 0) {
          acc[name] = result;
        }
      } else {
        // custom theorem
        const obj = { name, abbr: name, ...theorem } as RefObject;
        if (Array.isArray(acc.custom)) {
          acc.custom.push(obj);
        } else {
          acc.custom = [obj];
        }
      }

      return acc;
    },
    {},
  );
}
