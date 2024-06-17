import {
  Attributes,
  parseAttributes,
} from '../../shared-utils/parse-heading-attributes';
import GithubSlugger from 'github-slugger';
import { startCase } from 'lodash';
import { Heading, Paragraph, Root, Text } from 'mdast';
import { ContainerDirective } from 'mdast-util-directive';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

import { boxoutAllowList } from '../../shared-utils/boxout-allow-list';
import { Context } from '../context';
import {
  HeadingCounter,
  createHeadingCounter,
  getHeadingDepth,
} from '../utils/heading-counter';
// import { slug } from '../utils/slug';
import {
  TheoremCounter,
  createTheoremCounter,
} from '../utils/theorem-counter';

export function headingIncrements(ctx: Context) {
  return (tree: Root) => {
    const slugger = new GithubSlugger();
    const headingCounter = createHeadingCounter();
    const theoremCounter = createTheoremCounter();

    visit(tree, (node) => {
      if (node.type === 'heading') {
        transformHeading(node, slugger, headingCounter, ctx);
      }
      if (node.type === 'containerDirective') {
        transformEnvironment(
          node,
          slugger,
          headingCounter,
          theoremCounter,
          ctx
        );
      }
    });
  };
}

function transformHeading(
  heading: Heading,
  slugger: GithubSlugger,
  headingCounter: HeadingCounter,
  ctx: Context
) {
  const { text, attributes } = parseAttributes(toString(heading.children));

  if (headingShouldIncrement(attributes)) {
    headingCounter.increment(heading.depth);
  }

  const id = slugger.slug(attributes.id || text);
  const label = headingCounter.getCounts(heading.depth).join('.');

  if (attributes.id) {
    ctx.refMap[attributes.id] = { id, label };
  }

  heading.data = {
    ...(heading.data || {}),
    hProperties: {
      ...(heading.data?.hProperties || {}),
      id,
    },
  };

  if (
    headingShouldIncrement(attributes) &&
    headingShouldDisplayCount(heading)
  ) {
    heading.children.unshift(
      {
        type: 'text',
        value: label,
        data: {
          hName: 'span',
          hProperties: {
            className: ['count'],
          },
          hChildren: [
            {
              type: 'text',
              value: `${label}.`,
            },
          ],
        },
      },
      {
        type: 'text',
        value: ' ',
      }
    );
  }
}

function transformEnvironment(
  container: ContainerDirective,
  slugger: GithubSlugger,
  headingCounter: HeadingCounter,
  theoremCounter: TheoremCounter,
  ctx: Context
) {
  const name = container.name.trim();
  if (!boxoutAllowList.includes(name)) {
    return;
  }

  const theorem = ctx.theorems[name];

  let label: string;
  if (theorem) {
    const depth = getHeadingDepth(ctx.theorems, name);
    headingCounter.increment(depth);
    label = headingCounter.getCounts(depth).join('.');
  } else {
    theoremCounter.increment(name);
    label = String(theoremCounter.get(name));
  }

  const id = slugger.slug(
    container.attributes?.id || getSlug(`${name} ${label}`)
  );

  container.data = {
    ...(container.data || {}),
    hProperties: {
      ...(container.data?.hProperties || {}),
      id,
    },
  };

  if (container.attributes?.id) {
    ctx.refMap[container.attributes.id] = { id, label };
  }

  const typeName = theorem?.heading || startCase(name);
  const type: Text = {
    type: 'text',
    value: '',
    data: {
      hName: 'span',
      hProperties: {
        className: ['type'],
      },
      hChildren: [
        {
          type: 'text',
          value: typeName,
        },
      ],
    },
  };

  const stop: Text = {
    type: 'text',
    value: '.',
  };
  if (containerShouldDisplayCount(container)) {
    type.data?.hChildren?.push(
      {
        type: 'text',
        value: ' ',
      },
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['count'],
        },
        children: [
          {
            type: 'text',
            value: label,
          },
          stop,
        ],
      }
    );
  } else {
    type.data?.hChildren?.push(stop);
  }

  if (container.children.length === 0) {
    container.children.push({
      type: 'paragraph',
      children: [type],
    });
  } else {
    const firstChild = container.children[0];
    if (firstChild.type === 'paragraph') {
      firstChild.children.unshift(type, {
        type: 'text',
        value: ' ',
      });
    }
  }
}

function getSlug(text: string, counts?: number[]) {
  if (!counts) {
    return text;
  }
  const countStr = counts.join('.');
  return text + (countStr.length ? `-${countStr}` : '');
}

function headingShouldIncrement(attributes: Attributes) {
  return !attributes.classes.includes('starred');
}

function headingShouldDisplayCount(node: Heading) {
  return node.depth > 1 && node.depth < 5;
}

function containerShouldDisplayCount(node: ContainerDirective) {
  return node.name !== 'proof' && node.name !== 'solution';
}
