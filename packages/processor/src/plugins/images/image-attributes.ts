import { ariaAttributes } from 'aria-attributes';
import { img } from 'html-element-attributes';
// @ts-expect-error
import parseAttr from 'md-attr-parser';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const validAttrs = [...img, ...ariaAttributes];

export function imageAttributes() {
  return (tree: Root) => {
    // console.log('imageAttributes');
    // console.dir(tree, { depth: null });
    visit(tree, 'image', (node, idx, parent) => {
      const parentChildren = parent?.children || [];
      const nextIdx = (idx || 0) + 1;
      const nextSibling = parentChildren[nextIdx];

      if (
        !nextSibling ||
        (nextSibling.type !== 'text' &&
          nextSibling.type !== 'inlineCode') ||
        !nextSibling.value.startsWith('{')
      ) {
        return;
      }

      const attrs = parseAttr(nextSibling.value).prop as Record<
        string,
        string
      >;

      const props = Object.entries(attrs).reduce(
        (acc: Record<string, string>, [key, value]) => {
          if (validAttrs.includes(key)) {
            acc[key] = value;
          } else {
            acc[`data-${key}`] = value;
          }
          return acc;
        },
        {},
      );

      // console.log(props);

      node.alt = props.alt || node.alt || '';
      node.title = props.title || null;
      node.data = {
        hProperties: props,
      };

      if (nextSibling.type === 'text') {
        const endIdx = nextSibling.value.indexOf('}') + 1;
        nextSibling.value = nextSibling.value.slice(endIdx);
      } else if (nextSibling.type === 'inlineCode') {
        parentChildren.splice(nextIdx, 1);
      }
    });
  };
}
