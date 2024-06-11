import { Element } from 'hast';
import { Node } from 'unist';

import hamburgerSvg from '../assets/hamburger-icon.svg?raw';
import linkSvg from '../assets/link-icon.svg?raw';
import { getAssetHast } from './get-asset-hast';

type Svg = {
  id: string;
  viewBox: string;
  children: Node[];
};

function getSvgs(): Svg[] {
  return [
    createStoredSvg('hamburger-icon', hamburgerSvg),
    createStoredSvg('link-icon', linkSvg),
  ];
}

export function createSvg(name: string): Element {
  const { id, viewBox } = getSvg(name);
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: ['icon', id],
      viewBox,
    },
    children: [
      {
        type: 'element',
        tagName: 'use',
        properties: {
          href: `#${id}`,
        },
        children: [],
      },
    ],
  };
}

export function createDefs() {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      style: 'display: none',
    },
    children: [
      {
        type: 'element',
        tagName: 'defs',
        children: getSvgs().map(createGroup),
      },
    ],
  };
}

function createStoredSvg(id: string, svg: string) {
  const hast = getAssetHast(svg) as Element;
  const children = hast.children;
  const properties = (hast.properties || {}) as Record<string, string>;
  const viewBox = properties.viewBox as string;
  return { id, viewBox, children };
}

function getSvg(id: string) {
  const stored = getSvgs().find((o) => o.id === id);
  if (stored === undefined) {
    throw new Error(`svg icon not found: ${id}`);
  }
  return stored;
}

function createGroup({ id, children }: Svg) {
  return {
    type: 'element',
    tagName: 'g',
    properties: { id },
    children,
  };
}
