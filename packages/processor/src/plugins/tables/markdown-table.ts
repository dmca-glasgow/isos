// import { Element, Text } from 'hast';
// import { State } from 'hast-util-to-mdast';
// import { AlignType, Table, TableRow } from 'mdast';

// export function tableWithSpaceAround(
//   state: State,
//   node: Element,
// ): (Table | Text)[] {
//   return [
//     // {
//     //   type: 'text',
//     //   value: '\n',
//     // },
//     {
//       type: 'table',
//       align: getAlign(node),
//       children: state.all(node) as TableRow[],
//     },
//     // {
//     //   type: 'text',
//     //   value: '\n',
//     // },
//   ];
// }

// function getAlign(node: Element) {
//   const thead = node.children[0];
//   if (thead && thead.type === 'element' && thead.tagName === 'thead') {
//     const tr = thead.children[0];
//     if (tr && tr.type === 'element' && tr.tagName === 'tr') {
//       return tr.children
//         .filter((o) => 'properties' in o)
//         .map((o) => o.properties.align as AlignType);
//     }
//   }
//   return [];
// }
