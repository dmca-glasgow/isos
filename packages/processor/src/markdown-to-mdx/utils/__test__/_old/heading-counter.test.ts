import { expect, test } from 'vitest';

import { createHeadingCounter } from '../../heading-counter';

test('heading counter', async () => {
  const counter = createHeadingCounter();

  const depths = [1, 2, 3, 4, 5, 6, 6, 5, 6, 2, 3, 2, 3, 4, 3, 4, 4];

  const counts = depths.map((depth) => {
    counter.increment(depth);
    return counter.getCounts(depth);
  });

  expect(counts).toEqual([
    [],
    [1],
    [1, 1],
    [1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2],
    [1, 1, 1, 2],
    [1, 1, 1, 2, 1],
    [2],
    [2, 1],
    [3],
    [3, 1],
    [3, 1, 1],
    [3, 2],
    [3, 2, 1],
    [3, 2, 2],
  ]);
});
