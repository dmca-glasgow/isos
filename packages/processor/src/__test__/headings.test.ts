import { expect, test } from 'vitest';

import { unindentStringAndTrim } from '../test-utils/unindent-string';
import { testProcessor } from '../test-utils/unit-test-processor';

test('headings with counters and attributes', async () => {
  const latex = String.raw`
    \title{Alfa}
    \section{Bravo \textbf{hi}}
    \subsection{Charlie} \label{hi}
    \subsubsection{\textbf{Delta} hi}
    \paragraph{Echo}
    \subparagraph{Foxtrot}
    \paragraph{Golf}
    \subparagraph{Hotel}
    \section*{India}
    \section{Juliett}
    \subsection*{\textbf{Kilo}}
    \section{Lima}
    \subsection{Mike}
    \subsubsection{November}
    \subsection{Oscar}
    \subsubsection{Papa}
    \subsubsection*{Quebec \textbf{hi}}
    \subsubsection{Romeo}
  `;

  const markdown = await testProcessor.latex(latex);

  // console.log(markdown);

  const expectedMarkdown = unindentStringAndTrim(`
    # Alfa

    ## Bravo **hi**

    ### Charlie {#hi}

    #### **Delta** hi

    ##### Echo

    ###### Foxtrot

    ##### Golf

    ###### Hotel

    ## India {.starred}

    ## Juliett

    ### **Kilo** {.starred}

    ## Lima

    ### Mike

    #### November

    ### Oscar

    #### Papa

    #### Quebec **hi** {.starred}

    #### Romeo
  `);

  expect(markdown).toBe(expectedMarkdown);

  const html = await testProcessor.md(expectedMarkdown);

  // console.log(html);

  const expected = unindentStringAndTrim(`
    <h1 id="alfa">Alfa</h1>
    <section id="bravo-hi">
      <h2><span class="count">1.</span> Bravo <strong>hi</strong></h2>
      <section id="hi">
        <h3><span class="count">1.1.</span> Charlie</h3>
        <section id="delta-hi">
          <h4><span class="count">1.1.1.</span> <strong>Delta</strong> hi</h4>
          <section id="echo">
            <h5>Echo</h5>
            <section id="foxtrot">
              <h6>Foxtrot</h6>
            </section>
          </section>
          <section id="golf">
            <h5>Golf</h5>
            <section id="hotel">
              <h6>Hotel</h6>
            </section>
          </section>
        </section>
      </section>
    </section>
    <section id="india">
      <h2>India</h2>
    </section>
    <section id="juliett">
      <h2><span class="count">2.</span> Juliett</h2>
      <section id="kilo">
        <h3><strong>Kilo</strong></h3>
      </section>
    </section>
    <section id="lima">
      <h2><span class="count">3.</span> Lima</h2>
      <section id="mike">
        <h3><span class="count">3.1.</span> Mike</h3>
        <section id="november">
          <h4><span class="count">3.1.1.</span> November</h4>
        </section>
      </section>
      <section id="oscar">
        <h3><span class="count">3.2.</span> Oscar</h3>
        <section id="papa">
          <h4><span class="count">3.2.1.</span> Papa</h4>
        </section>
        <section id="quebec-hi">
          <h4>Quebec <strong>hi</strong></h4>
        </section>
        <section id="romeo">
          <h4><span class="count">3.2.2.</span> Romeo</h4>
        </section>
      </section>
    </section>
  `);

  expect(html).toBe(expected);
});
