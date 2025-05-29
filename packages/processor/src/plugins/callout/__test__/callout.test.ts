import { expect, test } from 'vitest';

// @ts-ignore
import { markdownToQuartoHtml } from '../../../test-utils/md-to-quarto-html';
import { unindentStringAndTrim } from '../../../test-utils/unindent-string';
import { testProcessor } from '../../../test-utils/unit-test-processor';

test('callout', async () => {
  const latex = unindentStringAndTrim(String.raw`
    \documentclass{article}
    \usepackage{awesomebox}
    \begin{document}

    \notebox{I'm a note \emph{callout} box}
    \tipbox{I'm a tip \emph{callout} box}
    \warningbox{I'm a warning \emph{callout} box}
    \cautionbox{I'm a caution \emph{callout} box}
    \importantbox{I'm an important \emph{callout} box}

    \end{document}
  `);

  const markdown = await testProcessor.latex(latex);
  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    ::: {.callout-note}
    I’m a note *callout* box
    :::

    ::: {.callout-tip}
    I’m a tip *callout* box
    :::

    ::: {.callout-warning}
    I’m a warning *callout* box
    :::

    ::: {.callout-caution}
    I’m a caution *callout* box
    :::

    ::: {.callout-important}
    I’m an important *callout* box
    :::
  `);

  expect(markdown).toBe(expectedMarkdown);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="callout note">
      <div class="callout-header"><span class="callout-icon-note"></span><span class="callout-title">Note</span></div>
      <div class="callout-content">
        <p>I’m a note <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout tip">
      <div class="callout-header"><span class="callout-icon-tip"></span><span class="callout-title">Tip</span></div>
      <div class="callout-content">
        <p>I’m a tip <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout warning">
      <div class="callout-header"><span class="callout-icon-warning"></span><span class="callout-title">Warning</span></div>
      <div class="callout-content">
        <p>I’m a warning <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout caution">
      <div class="callout-header"><span class="callout-icon-caution"></span><span class="callout-title">Caution</span></div>
      <div class="callout-content">
        <p>I’m a caution <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout important">
      <div class="callout-header"><span class="callout-icon-important"></span><span class="callout-title">Important</span></div>
      <div class="callout-content">
        <p>I’m an important <em>callout</em> box</p>
      </div>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});

test('callout with title', async () => {
  const markdown = unindentStringAndTrim(`
    ::: {.callout-note}
    I’m a note *callout* box
    :::

    ::: {.callout-tip title="Tip with Title"}
    I’m a tip *callout* box
    :::

    ::: {.callout-warning}
    I’m a warning *callout* box
    :::

    ::: {.callout-caution}
    I’m a caution *callout* box
    :::

    ::: {.callout-important}
    I’m an important *callout* box
    :::
  `);

  // const quartoHtml = await markdownToQuartoHtml(markdown);
  // console.log(quartoHtml);

  const html = await testProcessor.md(markdown);
  // console.log(html);

  const expectedHtml = unindentStringAndTrim(`
    <div class="callout note">
      <div class="callout-header"><span class="callout-icon-note"></span><span class="callout-title">Note</span></div>
      <div class="callout-content">
        <p>I’m a note <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout tip">
      <div class="callout-header"><span class="callout-icon-tip"></span><span class="callout-title">Tip with Title</span></div>
      <div class="callout-content">
        <p>I’m a tip <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout warning">
      <div class="callout-header"><span class="callout-icon-warning"></span><span class="callout-title">Warning</span></div>
      <div class="callout-content">
        <p>I’m a warning <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout caution">
      <div class="callout-header"><span class="callout-icon-caution"></span><span class="callout-title">Caution</span></div>
      <div class="callout-content">
        <p>I’m a caution <em>callout</em> box</p>
      </div>
    </div>
    <div class="callout important">
      <div class="callout-header"><span class="callout-icon-important"></span><span class="callout-title">Important</span></div>
      <div class="callout-content">
        <p>I’m an important <em>callout</em> box</p>
      </div>
    </div>
  `);

  expect(html).toBe(expectedHtml);
});
