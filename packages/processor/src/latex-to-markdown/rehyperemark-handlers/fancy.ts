// import { Element } from 'hast';
// import { State } from 'hast-util-to-mdast';
// import { Heading, PhrasingContent } from 'mdast';
// import { LeafDirective } from 'mdast-util-directive';

// import { Context } from '../context';

// export function createFancySection(state: State, node: Element): Heading {
//   const children = state.all(node) as PhrasingContent[];
//   return {
//     type: 'heading',
//     depth: 2,
//     children: [
//       ...children,
//       {
//         type: 'text',
//         value: ' {.fancy.starred}',
//       },
//     ],
//   };
// }

// export function createFancyTitle(
//   ctx: Context
//   // state: State,
//   // node: Element
// ): LeafDirective {
//   return {
//     type: 'leafDirective',
//     name: 'fancytitle',
//     attributes: {
//       part: ctx.fancyTitle.part,
//     },
//     children: [
//       {
//         type: 'text',
//         value: ctx.fancyTitle.content,
//       },
//     ],
//   };
// }
