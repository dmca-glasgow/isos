import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../../../utils/unindent-string';
import { unitTestProcessor } from '../../../utils/unit-test-processor';

test('task and answer', async () => {
  const html = await unitTestProcessor(`
    ::::task
    Test task

    :::answer
    Test answer
    :::
    ::::
  `);

  const expected = unindentStringAndTrim(`
    <div class="boxout task"><span class="type">Task 1</span>
      <p>Test task</p><span class="answer-trigger">Show answer</span>
      <div class="answer-reveal">
        <p>Test answer</p>
      </div>
    </div>
  `);

  expect(html).toBe(expected);
});
