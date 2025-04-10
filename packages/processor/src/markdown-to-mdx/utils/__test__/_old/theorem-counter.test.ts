import { expect, test } from 'vitest';

import { createTheoremCounter } from '../../theorem-counter';

test('theorem counter', async () => {
  const counter = createTheoremCounter();

  const depths = [
    'alpha',
    'bravo',
    'charlie',
    'delta',
    'echo',
    'foxtrot',
    'foxtrot',
    'echo',
    'foxtrot',
    'bravo',
    'charlie',
    'bravo',
    'charlie',
    'delta',
    'charlie',
    'delta',
    'delta',
  ];

  const counts = depths.map((depth) => {
    counter.increment(depth);
    return counter.get(depth);
  });

  expect(counts).toEqual([
    1, 1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 3, 3, 2, 4, 3, 4,
  ]);
});
