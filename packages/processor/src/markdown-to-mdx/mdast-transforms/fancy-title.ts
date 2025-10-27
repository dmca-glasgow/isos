// import { Root } from 'mdast';
// import { toString } from 'mdast-util-to-string';
// import { visit } from 'unist-util-visit';

// export function fancyTitle() {
//   return (tree: Root) => {
//     visit(tree, 'leafDirective', (node) => {
//       if (node.name === 'fancytitle') {
//         const content = toString(node.children);
//         const part = node.attributes?.part || '';

//         node.data = {
//           ...(node.data || {}),
//           hName: 'h1',
//           hChildren: [
//             {
//               type: 'text',
//               value: `${content} `,
//             },
//             {
//               type: 'element',
//               tagName: 'span',
//               properties: {
//                 className: 'part',
//               },
//               children: [
//                 {
//                   type: 'element',
//                   tagName: 'span',
//                   properties: {
//                     className: 'label',
//                   },
//                   children: [
//                     {
//                       type: 'text',
//                       value: 'Part',
//                     },
//                   ],
//                 },
//                 {
//                   type: 'text',
//                   value: ' ',
//                 },
//                 {
//                   type: 'element',
//                   tagName: 'span',
//                   properties: {
//                     className: 'number',
//                   },
//                   children: [
//                     {
//                       type: 'text',
//                       value: part,
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         };
//       }
//     });
//   };
// }
