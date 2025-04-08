// https://github.com/syntax-tree/mdast-util-math/blob/main/lib/index.js
import { ok as assert } from 'devlop';

/**
 * Create an extension for `mdast-util-from-markdown`.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function subscriptFromMarkdown() {
  return {
    enter: {
      subscriptText: enterSuperSubText,
    },
    exit: {
      subscriptText: exitSuperSubText,
      subscriptTextData: exitSuperSubData,
    },
  };

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterSuperSubText(token) {
    this.enter(
      {
        type: 'subscript',
        value: '',
        data: {
          hName: 'sub',
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
    assert(node.type === 'subscript');
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
