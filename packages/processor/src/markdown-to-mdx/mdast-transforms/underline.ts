// import { Root } from 'mdast';
// import { TextDirective } from 'mdast-util-directive';
// import { visit } from 'unist-util-visit';

// export function underline() {
//   return async (tree: Root) => {
//     visit(tree, 'textDirective', (node: TextDirective) => {
//       const name = node.name.trim();
//       if (name === 'underline') {
//         node.data = {
//           ...(node.data || {}),
//           hName: 'u',
//           hProperties: {
//             ...(node.data?.hProperties || {}),
//           },
//         };
//       }
//     });
//   };
// }
