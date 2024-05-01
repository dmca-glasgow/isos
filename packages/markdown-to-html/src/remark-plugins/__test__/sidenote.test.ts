import { testProcessor } from '../../test-utils/test-processor';

describe('sidenotes', () => {
  it('should render an inline sidenote', async () => {
    const { html } = await testProcessor(`
      My content \`\\sidenote{My sidenote}\`{=latex}.
    `);

    // <p>
    //   My content
    //   <span class="sidenote-wrapper">
    //     <label
    //       tabindex="0"
    //       title="My sidenote"
    //       aria-describedby="sidenote-1">
    //       <sup>1</sup>
    //     </label>
    //     <small id="sidenote-1">
    //       <span class="sidenote-parenthesis">(sidenote: </span>
    //       <sup>1</sup> My sidenote
    //       <span class="sidenote-parenthesis">)</span>
    //     </small>
    //   </span>.
    // </p>

    expect(html.trim()).toBe(
      `<p>My content <span class="sidenote"><label tabindex="0" title="My sidenote" aria-describedby="sidenote-1"><sup>1</sup></label><small id="sidenote-1"><span class="sidenote-parenthesis">(sidenote: </span><sup>1</sup> My sidenote<span class="sidenote-parenthesis">)</span></small></span>.</p>`,
    );
  });

  it('should render a block sidenote', async () => {
    const { html } = await testProcessor(`
    Bla bla 1.

    \`\`\`{=latex}
    \\sidenote{You should {\\bf always} be clear.}
    \`\`\`

    Bla bla 2.
    `);

    expect(html.trim()).toBe(
      `<p>Bla bla 1.</p><span class="sidenote"><label tabindex="0" title="You should {\\bf always} be clear." aria-describedby="sidenote-1"><sup>1</sup></label><small id="sidenote-1"><span class="sidenote-parenthesis">(sidenote: </span><sup>1</sup> You should {\\bf always} be clear.<span class="sidenote-parenthesis">)</span></small></span>\n<p>Bla bla 2.</p>`,
    );
  });
});
