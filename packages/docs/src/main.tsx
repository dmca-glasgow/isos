import './index.scss';

import { kebabCase } from 'lodash';
import { JSX, render } from 'preact';

import { CodeSnippet } from './components/code-snippet.tsx';
import { Downloads } from './components/downloads.tsx';
import { MockCodeSnippet } from './components/mock-code-snippet.tsx';
import { SyntaxHighlight } from './components/syntax-highlight.tsx';
import Callouts from './content/callouts.mdx';
import Code from './content/code.mdx';
import Cover from './content/cover.mdx';
import FileTransclusion from './content/file-transclusion.mdx';
import Footnotes from './content/footnotes.mdx';
import Headings from './content/headings.mdx';
import Images from './content/images.mdx';
import Intro from './content/intro.mdx';
import Lists from './content/lists.mdx';
import Maths from './content/maths.mdx';
import Paragraph from './content/paragraph.mdx';
import Referencing from './content/referencing.mdx';
import Tables from './content/tables.mdx';
import Theorems from './content/theorems.mdx';
import Title from './content/title.mdx';
import logoSrc from './logo.png';

const components = {
  Downloads,
  CodeSnippet,
  MockCodeSnippet,
  SyntaxHighlight,
};

type Section = {
  title: string;
  content: JSX.Element;
};

const sections: Section[] = [
  {
    title: 'Introduction',
    content: <Intro components={components} />,
  },
  {
    title: 'Cover',
    content: <Cover components={components} />,
  },
  {
    title: 'Headings',
    content: <Headings components={components} />,
  },
  {
    title: 'Paragraph',
    content: <Paragraph components={components} />,
  },
  {
    title: 'Maths',
    content: <Maths components={components} />,
  },
  {
    title: 'Referencing',
    content: <Referencing components={components} />,
  },
  {
    title: 'Theorems and proofs',
    content: <Theorems components={components} />,
  },
  {
    title: 'Footnotes and sidenotes',
    content: <Footnotes components={components} />,
  },
  {
    title: 'Lists',
    content: <Lists components={components} />,
  },
  {
    title: 'Tables',
    content: <Tables components={components} />,
  },
  {
    title: 'Images',
    content: <Images components={components} />,
  },
  {
    title: 'Callouts',
    content: <Callouts components={components} />,
  },
  {
    title: 'Code',
    content: <Code components={components} />,
  },
  {
    title: 'File transclusion',
    content: <FileTransclusion components={components} />,
  },
];

function App() {
  return (
    <>
      <div className="logo">
        <div>
          <img src={logoSrc} />
          <nav>
            <ol>
              {sections.map((o, idx) => (
                <li key={idx}>
                  <a href={'#' + kebabCase(o.title)}>{o.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
      <main>
        <article>
          <Title />
          {sections.map((o, idx) => (
            <section key={idx}>
              <h2 id={kebabCase(o.title)}>{o.title}</h2>
              {o.content}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}

render(<App />, document.getElementById('app')!);
