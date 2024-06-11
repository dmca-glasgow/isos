import { Theorems } from '../../shared-utils/theorem';

export type HeadingCounter = {
  get: (depth: number) => number;
  getCounts: (depth: number) => number[];
  increment: (depth: number) => void;
  format: (depth: number) => string;
};

export function createHeadingCounter(): HeadingCounter {
  const count = [0, 0, 0, 0, 0, 0];
  let lastDepth = 0;
  return {
    get(depth: number) {
      return count[depth - 1];
    },
    getCounts(depth: number) {
      return count.slice(1, depth);
    },
    increment(depth: number) {
      ++count[depth - 1];

      if (depth < lastDepth) {
        count.fill(0, depth, count.length);
      }
      lastDepth = depth;
    },
    format(depth: number) {
      return count
        .slice(1, depth)
        .map((h) => `${h}.`)
        .join('');
    },
  };
}

export function formatCounts(counts: number[]) {
  return counts.join('.');
}

const headingDepths: Record<string, number> = {
  title: 1,
  section: 2,
  subsection: 3,
  subsubsection: 4,
  paragraph: 5,
  subparagraph: 6,
};

// TODO: return TheoremCounter instead of erroring
export function getHeadingDepth(theorems: Theorems, name: string): number {
  // console.log(theorems, name);
  const environment = theorems[name];
  if (environment === undefined) {
    throw new Error(`thereom not found: ${name}`);
  }

  function findParentHeading(name: string) {
    const environment = theorems[name];
    if (environment.numberWithin) {
      return environment.numberWithin;
    }
    if (environment.referenceCounter) {
      return findParentHeading(environment.referenceCounter);
    }
    throw new Error(
      `thereom parent \`numberWithin\` not found for: ${name}`
    );
  }

  const parentHeading = findParentHeading(name);
  const parentDepth = headingDepths[parentHeading];
  if (parentDepth === undefined) {
    throw new Error(`thereom \`numberWithin\` not found: ${name}`);
  }

  return parentDepth + 1;
}
