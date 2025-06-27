import { styled } from '@linaria/react';

export const HTMLPreview = styled.div`
  flex: 1;
  background: rgb(47, 47, 47);
  padding: 1em 0;
  overflow-x: auto;

  & > article {
    section,
    header {
      --margin: 1em;
      display: grid;
      gap: 0;
      grid-template-columns:
        [left-margin] var(--margin)
        [content] 1fr
        [content-end] var(--margin)
        [end];

      & > * {
        grid-column: content / content-end;
      }
    }

    &.has-sidenotes {
      section,
      header {
        grid-template-columns:
          [left-margin] var(--margin)
          [content] 1fr
          [content-end] 2em
          [side] 10em
          [right-margin] var(--margin)
          [end];
      }

      section {
        aside {
          grid-column: side / right-margin;
          font-size: 0.9em;
        }
      }
    }

    .footnotes {
      h2 {
        margin-bottom: 0;
      }
      ol {
        margin-top: 0;
      }
    }
  }

  table {
    margin: 0 auto;
    border-collapse: collapse;
    font-size: 0.9em;

    &,
    th,
    td {
      border: 1px solid #fff3;
    }
    & {
      border-right-width: 0;
      border-bottom-width: 0;
    }
    th,
    td {
      padding: 0 0.4em;
      border-top-width: 0;
      border-left-width: 0;
    }
  }

  figure {
    figcaption {
      text-align: center;
      margin: 0.5em 0;
    }
  }

  p.maths {
    // padding-left: 1em;
    text-align: center;
    // overflow: auto;
    svg {
      max-width: 100%;
    }
  }

  .env-equation {
    display: flex;
    align-items: center;

    .maths {
      flex: 1;
    }
    /* .eq-count {
      flex: 0 0 auto;
    } */
  }

  img {
    display: block;
    margin: 0 auto;
  }

  .plain {
    font-style: italic;
    .title {
      font-style: normal;
    }
  }

  .plain,
  .definition,
  .remark {
    .title {
      padding-right: 0.5em;
    }
  }

  .callout {
    background: hsl(from #fff h s calc(l - 80));
    margin-bottom: 2em;
    border-left: 0.3em solid hsl(from #fff h s calc(l - 50));

    .callout-header {
      padding: 0.2em 1em 0.1em;
      background: hsl(from #fff h s calc(l - 75));
      font-weight: bold;

      display: flex;
      align-items: center;
      svg {
        --size: 0.8em;
        flex: 0 0 auto;
        width: var(--size);
        height: var(--size);
        fill: #fff;
        margin-right: 0.5em;
        opacity: 0.5;
      }
    }

    .callout-content {
      padding: 0 1em 1em;
    }

    *:last-child {
      margin-bottom: 0;
    }
  }

  code {
    display: inline-block;
    background: hsl(from #fff h s calc(l - 75));
    font-family: monospace;
    font-size: 1.2em;
    padding: 0 0.4em;
    border-radius: 0.3em;
    margin: 0 0.2em;

    // https://github.com/PrismJS/prism/blob/master/themes/prism-dark.css
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: hsl(30, 20%, 50%);
    }

    .token.punctuation {
      opacity: 0.7;
    }

    .token.namespace {
      opacity: 0.7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol {
      color: hsl(350, 40%, 70%);
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: hsl(75, 70%, 60%);
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable {
      color: hsl(40, 90%, 60%);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: hsl(350, 40%, 70%);
    }

    .token.regex,
    .token.important {
      color: #e90;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.deleted {
      color: red;
    }
  }

  pre {
    text-wrap-mode: wrap;
    margin-bottom: 1.5em;
    background: hsl(from #fff h s calc(l - 80));
    border-left: 0.3em solid hsl(from #fff h s calc(l - 50));

    code {
      display: block;
      background: none;
      padding: 1em;
      /* font-weight: bold;
      font-size: 0.8em;
      font-style: normal;
      background: #444;
      color: #ccc;
      padding: 0.1em 0.5em 0.05em;
      border-radius: 0.3em;
      position: relative;
      bottom: 0.1em; */
    }
  }

  span.warn {
    display: inline-block;
    padding: 0 0.5em;
    /* font-size: 0.8em; */
    background: orange;
    color: black;
    border-radius: 0.2em;

    code {
      background: none;
    }
  }
`;
