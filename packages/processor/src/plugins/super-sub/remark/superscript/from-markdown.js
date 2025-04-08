import { ok as assert } from 'devlop';

/**
 * Create an extension for `mdast-util-from-markdown`.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function superscriptFromMarkdown() {
  return {
    enter: {
      superscriptText: enterSuperSubText,
    },
    exit: {
      superscriptText: exitSuperSubText,
      superscriptTextData: exitSuperSubData,
    },
  };

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterSuperSubText(token) {
    this.enter(
      {
        type: 'superscript',
        value: '',
        data: {
          hName: 'sup',
          hProperties: {},
          hChildren: [],
        },
      },
      token,
    );
    this.buffer();
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitSuperSubText(token) {
    const data = this.resume();
    const node = this.stack[this.stack.length - 1];
    assert(node.type === 'superscript');
    this.exit(token);
    node.value = data;
    const children = /** @type {Array<HastElementContent>} */ (
      // @ts-expect-error: we defined it in `enterMathFlow`.
      node.data.hChildren
    );
    children.push({ type: 'text', value: data });
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitSuperSubData(token) {
    this.config.enter.data.call(this, token);
    this.config.exit.data.call(this, token);
  }
}
