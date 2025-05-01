import {
  TheoremYaml,
  TheoremsYaml,
  defaultTheorems,
} from './default-theorems';

export function theoremsToFrontmatter(theorems: TheoremsYaml) {
  return Object.entries(theorems).reduce(
    (acc: TheoremsYaml, [name, theorem]) => {
      const defaultTheorem = defaultTheorems.find((o) => o.name === name);

      if (defaultTheorem) {
        const result: TheoremYaml = {};

        for (const [_key, value] of Object.entries(theorem)) {
          const key = _key as keyof TheoremYaml;

          // defaults can be omitted
          if (value === defaultTheorem[key]) {
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
