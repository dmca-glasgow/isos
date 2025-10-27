import {
  SP,
  arg,
  args,
  env,
  m,
  s,
} from '@unified-latex/unified-latex-builder';
import { trimRenderInfo } from '@unified-latex/unified-latex-util-render-info';
import util from 'util';
import { describe, expect, it } from 'vitest';

import { printRaw } from '@isos/unified-latex-util-print-raw';

import { parse } from '../libs/parse';
import { parseMath } from '../libs/parse-math';

/* eslint-env jest */

// Make console.log pretty-print by default
const origLog = console.log;
console.log = (...args) => {
  origLog(...args.map((x) => util.inspect(x, false, 10, true)));
};

describe('unified-latex-util-parse', () => {
  it('Parses verbatim arguments from `minted` directly as strings', () => {
    expect(trimRenderInfo(parse('\\lstinline{some_code$}'))).toEqual({
      type: 'root',
      content: [
        m('lstinline', args([null, 'some_code$'], { braces: '[]{}' })),
      ],
    });
    expect(
      trimRenderInfo(parse('\\lstinline[language]{some_code$}')),
    ).toEqual({
      type: 'root',
      content: [
        m(
          'lstinline',
          args(['language', 'some_code$'], { braces: '[]{}' }),
        ),
      ],
    });
    expect(trimRenderInfo(parse('\\lstinline#some_code$#'))).toEqual({
      type: 'root',
      content: [
        m('lstinline', [
          arg(null),
          arg('some_code$', { openMark: '#', closeMark: '#' }),
        ]),
      ],
    });
    expect(
      trimRenderInfo(parse('\\lstinline[language]!some_code$!')),
    ).toEqual({
      type: 'root',
      content: [
        m('lstinline', [
          arg('language', { braces: '[]' }),
          arg('some_code$', { openMark: '!', closeMark: '!' }),
        ]),
      ],
    });
    expect(
      trimRenderInfo(parse('\\lstinline[foo %bar\n\n]{my code}')),
    ).toEqual({
      type: 'root',
      content: [
        m('lstinline', [
          arg(
            [
              s('foo'),
              {
                type: 'comment',
                content: 'bar',
                leadingWhitespace: true,
                sameline: true,
                suffixParbreak: true,
              },
              { type: 'parbreak' },
            ],
            { braces: '[]' },
          ),
          arg('my code'),
        ]),
      ],
    });
    expect(
      trimRenderInfo(
        parse('\\lstinline{code % also code\n\\still code\\\\}'),
      ),
    ).toEqual({
      type: 'root',
      content: [
        m('lstinline', [
          arg(null),
          arg('code % also code\n\\still code\\\\'),
        ]),
      ],
    });

    expect(
      trimRenderInfo(parse('\\mint[options]{language}#some_code$#')),
    ).toEqual({
      type: 'root',
      content: [
        m('mint', [
          ...args(['options', 'language'], { braces: '[]{}' }),
          arg('some_code$', { openMark: '#', closeMark: '#' }),
        ]),
      ],
    });
    expect(
      trimRenderInfo(parse('\\mintinline[options]{language}#some_code$#')),
    ).toEqual({
      type: 'root',
      content: [
        m('mintinline', [
          ...args(['options', 'language'], { braces: '[]{}' }),
          arg('some_code$', { openMark: '#', closeMark: '#' }),
        ]),
      ],
    });
  });

  it('parses verbatim environments from `minted`', () => {
    expect(
      trimRenderInfo(
        parse('\\begin{minted}{python}some_code$\\end{minted}'),
      ),
    ).toEqual({
      type: 'root',
      content: [
        env(
          'minted',
          [s('some_code$')],
          [
            arg([], { openMark: '', closeMark: '' }),
            arg('python', { braces: '{}' }),
          ],
        ),
      ],
    });

    expect(
      trimRenderInfo(
        parse('\\begin{minted}[foo]{python}some_code$\\end{minted}'),
      ),
    ).toEqual({
      type: 'root',
      content: [
        env(
          'minted',
          [s('some_code$')],
          [arg('foo', { braces: '[]' }), arg('python', { braces: '{}' })],
        ),
      ],
    });
  });
});
