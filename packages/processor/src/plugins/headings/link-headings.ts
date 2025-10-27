// import { Root } from 'hast';
// import { visit } from 'unist-util-visit';

// const titles = ['h2', 'h3'];

// // <a class="link" href="#general-information"><svg class="icon link-icon" viewBox="0 0 16 16"><use href="#link-icon"></use></svg></a>

// export function linkHeadings() {
//   return (tree: Root) => {
//     visit(tree, 'element', (node) => {
//       if (titles.includes(node.tagName)) {
//         node.children.unshift({
//           type: 'element',
//           tagName: 'a',
//           properties: {
//             className: 'link',
//             href: '',
//           },
//           children: [],
//         });
//         // console.log(node);
//       }
//     });
//   };
// }
