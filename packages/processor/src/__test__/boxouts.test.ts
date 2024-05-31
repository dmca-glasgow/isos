import { describe, expect, it } from 'vitest';

import { unindentStringAndTrim } from '../utils/unindent-string';
import { unitTestProcessor } from '../utils/unit-test-processor';

describe('example', () => {
  it('should render an example boxout', async () => {
    const { html } = await unitTestProcessor(`
      :::example
      An \`example\\n\` of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout example" id="example-1"><span class="type">Example 1</span>
        <p>An <code>example\\n</code> of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });

  it('should render an example boxout with an icon', async () => {
    const { html } = await unitTestProcessor(`
      :::example{icon=hello}
      An example of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout example hello-icon" id="example-1"><span class="type">Example 1</span>
        <p>An example of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });
});

describe('supplement', () => {
  it('should render a supplement boxout', async () => {
    const { html } = await unitTestProcessor(`
      :::supplement
      A supplement of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout supplement" id="supplement-1"><span class="type">Supplement 1</span>
        <p>A supplement of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });
});

describe('background', () => {
  it('should render a background boxout', async () => {
    const { html } = await unitTestProcessor(`
      :::background
      A background of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout background" id="background-1"><span class="type">Background 1</span>
        <p>A background of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });
});

describe('proposition', () => {
  it('should render a proposition boxout', async () => {
    const { html } = await unitTestProcessor(`
      :::proposition
      A proposition of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout proposition" id="proposition-1"><span class="type">Proposition 1</span>
        <p>A proposition of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });
});

describe('weblink', () => {
  it('should render a weblink boxout', async () => {
    const { html } = await unitTestProcessor(`
      :::weblink{target=https://cran.r-project.org}
      A weblink of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout weblink" id="weblink-1"><span class="type">Weblink 1</span>
        <h3 id="httpscranr-projectorg"><a class="link" href="#httpscranr-projectorg"><svg class="icon link-icon" viewBox="0 0 16 16">
              <use href="#link-icon"></use>
            </svg></a><a href="https://cran.r-project.org" target="_blank" class="target">https://cran.r-project.org</a></h3>
        <p>A weblink of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });

  it.skip('should render a weblink boxout with title', async () => {
    const { html } = await unitTestProcessor(`
      :::weblink[CRAN]{target=https://cran.r-project.org}
      A weblink of *this*!
      :::
    `);

    const expected = unindentStringAndTrim(`
      <div class="boxout weblink" id="weblink-1"><span class="type">Weblink 1</span>
        <h3 id="cran"><a class="link" href="#cran"><svg class="icon link-icon">
              <use href="#link-icon"></use>
            </svg></a><a href="https://cran.r-project.org" target="_blank" class="target">CRAN</a></h3>
        <p>A weblink of <em>this</em>!</p>
      </div>
    `);

    expect(html).toBe(expected);
  });
});
