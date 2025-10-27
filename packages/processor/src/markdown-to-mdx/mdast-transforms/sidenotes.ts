// import { Parent, Root } from 'mdast';
// import { TextDirective } from 'mdast-util-directive';
// import { toHast } from 'mdast-util-to-hast';
// import { toString } from 'mdast-util-to-string';
// import { visit } from 'unist-util-visit';

// import { Context } from '../context';

// export function sidenotes(ctx: Context) {
//   return (tree: Root) => {
//     // TODO: create sidenote counter
//     let count = 0;

//     visit(tree, 'textDirective', (node: TextDirective) => {
//       const name = node.name.trim();
//       if (name === 'sidenote') {
//         ctx.hasSideNotes = true;
//         createSideNote(node, ++count);
//       }
//     });
//   };
// }

// function createSideNote(node: TextDirective, count: number) {
//   const id = `sidenote-${count}`;
//   const content = toHast(node) as Parent;

//   Object.assign(node, {
//     data: {
//       hName: 'span',
//       hProperties: {
//         className: 'sidenote',
//       },
//       hChildren: [
//         {
//           type: 'element',
//           tagName: 'label',
//           properties: {
//             tabindex: 0,
//             title: toString(node.children),
//             'aria-describedby': id,
//           },
//           children: [
//             {
//               type: 'element',
//               tagName: 'sup',
//               properties: {},
//               children: [
//                 {
//                   type: 'text',
//                   value: String(count),
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'element',
//           tagName: 'small',
//           properties: { id },
//           children: [
//             {
//               type: 'element',
//               tagName: 'span',
//               properties: {
//                 className: 'sidenote-parenthesis',
//               },
//               children: [
//                 {
//                   type: 'text',
//                   value: '(sidenote: ',
//                 },
//               ],
//             },
//             {
//               type: 'element',
//               tagName: 'sup',
//               properties: {},
//               children: [
//                 {
//                   type: 'text',
//                   value: String(count),
//                 },
//               ],
//             },
//             {
//               type: 'text',
//               value: ' ',
//             },
//             ...(content.children || []),
//             {
//               type: 'element',
//               tagName: 'span',
//               properties: {
//                 className: 'sidenote-parenthesis',
//               },
//               children: [
//                 {
//                   type: 'text',
//                   value: ')',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   });
// }
