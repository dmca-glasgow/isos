import { readFile } from 'fs/promises';
import { Properties, Root } from 'hast';
import { drawPageAsSVG, loadPDF } from 'mupdf/tasks';
import rehype from 'rehype-parse';
import stringify from 'rehype-stringify';
import { optimize } from 'svgo';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export async function pdfToSvg(filePath: string) {
  const data = await readFile(filePath);
  const doc = loadPDF(data);
  const svg = drawPageAsSVG(doc, 0);
  return formatSvg(svg);
}

async function formatSvg(_str: string) {
  const str = _str.replace(/svg:/g, '');
  const optimised = optimize(str, { multipass: true });
  const processor = unified()
    .use(rehype, { fragment: true })
    .use(addWrapper)
    .use(stringify);
  const parsed = await processor.process(optimised.data);
  // const transformed = (await processor.run(parsed)) as Parent;
  // const firstChild = transformed.children[0] as Root;
  return String(parsed);
}

function addWrapper() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'svg') {
        const properties = node.properties || {};
        node.properties = {
          // width: properties.width,
          // height: properties.height,
          viewBox: getViewBox(properties),
        };
      }
    });
  };
}

function getViewBox(properties: Properties) {
  if (properties.viewBox) {
    return properties.viewBox;
  }
  return `0 0 ${properties.width} ${properties.height}`;
}
