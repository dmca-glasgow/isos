import {
  testProcessor,
  unindentString,
} from '../../test-utils/test-processor';

describe('footnotes', () => {
  it('should render a footnote', async () => {
    const { html } = await testProcessor(`
      Bla bla [^1].

      [^1]: Bla
    `);

    const expected = unindentString(`
      <p>Bla bla <sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup>.</p>
      <section data-footnotes="" class="footnotes">
        <h2 class="sr-only" id="footnote-label"><a class="link" href="#footnote-label"><svg class="icon link-icon">
              <use href="#link-icon"></use>
            </svg></a>Footnotes</h2>
        <ol>
          <li id="user-content-fn-1">
            <p>Bla <a href="#user-content-fnref-1" data-footnote-backref="" aria-label="Back to reference 1" class="data-footnote-backref">↩</a></p>
          </li>
        </ol>
      </section>
    `);

    expect(html).toBe(expected);
  });
});
