// https://github.com/syntax-tree/mdast-util-math/blob/main/lib/index.js

/**
 * Create an extension for `mdast-util-to-markdown`.
 *
 * @param {ToOptions | null | undefined} [options]
 *   Configuration (optional).
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown`.
 */
export function subscriptToMarkdown(options) {
  let single = (options || {}).singleDollarTextMath;

  if (single === null || single === undefined) {
    single = true;
  }

  subscript.peek = subscriptPeek;

  return {
    unsafe: [
      // {
      //   character: '~',
      //   after: single ? undefined : '\\~',
      //   inConstruct: 'phrasing'
      // },
      { atBreak: true, character: '~', after: '\\~' },
    ],
    handlers: { subscript },
  };

  /**
   * @type {ToMarkdownHandle}
   * @param {subscript} node
   */
  // Note: fixing this code? Please also fix the similar code for inline code:
  // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/handle/inline-code.js>
  function subscript(node, _, state) {
    let value = node.value || '';
    let size = 1;

    if (!single) size++;

    // If there is a single dollar sign on its own in the math, use a fence of
    // two.
    // If there are two in a row, use one.
    while (
      new RegExp('(^|[^\~])' + '\\\~'.repeat(size) + '([^\~]|\~)').test(
        value,
      )
    ) {
      size++;
    }

    const sequence = '~'.repeat(size);

    // If this is not just spaces or eols (tabs don’t count), and either the
    // first and last character are a space or eol, or the first or last
    // character are dollar signs, then pad with spaces.
    if (
      // Contains non-space.
      /[^ \r\n]/.test(value) &&
      // Starts with space and ends with space.
      ((/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value)) ||
        // Starts or ends with dollar.
        /^\\~|\\~$/.test(value))
    ) {
      value = ' ' + value + ' ';
    }

    let index = -1;

    // We have a potential problem: certain characters after eols could result in
    // blocks being seen.
    // For example, if someone injected the string `'\n# b'`, then that would
    // result in an ATX heading.
    // We can’t escape characters in `subscript`, but because eols are
    // transformed to spaces when going from markdown to HTML anyway, we can swap
    // them out.
    while (++index < state.unsafe.length) {
      const pattern = state.unsafe[index];

      // Only look for `atBreak`s.
      // Btw: note that `atBreak` patterns will always start the regex at LF or
      // CR.
      if (!pattern.atBreak) continue;

      const expression = state.compilePattern(pattern);
      /** @type {RegExpExecArray | null} */
      let match;

      while ((match = expression.exec(value))) {
        let position = match.index;

        // Support CRLF (patterns only look for one of the characters).
        if (
          value.codePointAt(position) === 10 /* `\n` */ &&
          value.codePointAt(position - 1) === 13 /* `\r` */
        ) {
          position--;
        }

        value =
          value.slice(0, position) + ' ' + value.slice(match.index + 1);
      }
    }

    return sequence + value + sequence;
  }

  /**
   * @returns {string}
   */
  function subscriptPeek() {
    return '~';
  }
}
