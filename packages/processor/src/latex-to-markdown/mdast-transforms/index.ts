import { headingLabels } from './heading-labels';
// import { Node, Root } from 'mdast';
import { PluggableList } from 'unified';

// import { visit } from 'unist-util-visit';
import { Context } from '../context';

export function createMdastTransforms(ctx: Context): PluggableList {
  // console.log(ctx);
  return [
    // () => (tree: Root) => {
    //   visit(tree, (node: Node) => {
    //     if (node.type === 'element') {
    //       console.log(node);
    //     }
    //   });
    // },
    headingLabels,
  ];
}
