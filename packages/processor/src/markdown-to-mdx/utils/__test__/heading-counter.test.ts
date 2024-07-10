import { expect, test } from 'vitest';

import { createHeadingCounter } from '../heading-counter';

test.skip('heading counter', async () => {
  const counter = createHeadingCounter();

  const counts = [
    // [...counter.increment(1)],
    // [...counter.increment(2)],
    // [...counter.increment(3)],
    // [...counter.increment(4)],
    // [...counter.increment(5)],
    // [...counter.increment(6)],
    // [...counter.increment(6)],
    // [...counter.increment(5)],
    // [...counter.increment(6)],
    // [...counter.increment(2)],
    // [...counter.increment(3)],
    // [...counter.increment(2)],
    // [...counter.increment(3)],
    // [...counter.increment(4)],
    // [...counter.increment(3)],
    // [...counter.increment(4)],
    // [...counter.increment(4)],
  ];

  expect(counts).toEqual([
    [1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 2, 0],
    [1, 1, 1, 1, 2, 1],
    [1, 2, 0, 0, 0, 0],
    [1, 2, 1, 0, 0, 0],
    [1, 3, 0, 0, 0, 0],
    [1, 3, 1, 0, 0, 0],
    [1, 3, 1, 1, 0, 0],
    [1, 3, 2, 0, 0, 0],
    [1, 3, 2, 1, 0, 0],
    [1, 3, 2, 2, 0, 0],
  ]);

  const str = counter.format(4);

  expect(str).toBe('3.2.2.');
});
