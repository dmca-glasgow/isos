import { Element } from 'hast';
import { State } from 'hast-util-to-mdast';
import { BlockContent, DefinitionContent } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';

export function createFramed(
  state: State,
  node: Element
): ContainerDirective {
  return {
    type: 'containerDirective',
    name: 'framed',
    children: state.all(node) as (BlockContent | DefinitionContent)[],
  };
}
