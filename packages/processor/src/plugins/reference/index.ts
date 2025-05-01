import { Link, Root } from 'mdast';
import { findAndReplace } from 'mdast-util-find-and-replace';

import { defaultTheorems } from '../theorems-proofs/default-theorems';

const pattern = /@([\w-]+)/;

export default function atReferences() {
  return (tree: Root) => {
    findAndReplace(tree, [
      pattern,
      (_, ref): Link | null => {
        const [abbr] = ref.split('-');
        const theorem = defaultTheorems.find((o) => o.abbr === abbr);
        if (theorem) {
          return {
            type: 'link',
            url: `#${ref}`,
            children: [{ type: 'text', value: `${theorem.heading} 1` }],
            data: {
              hProperties: {
                class: 'ref',
              },
            },
          };
        }
        return null;
      },
    ]);
  };
}
