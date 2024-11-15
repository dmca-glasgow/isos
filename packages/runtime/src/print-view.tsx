import { useEffect } from 'preact/hooks';

import { render } from '@isos/paged';

type Props = {
  onRendered?: () => unknown;
};

export function PrintView({ onRendered }: Props) {
  useEffect(() => {
    renderPrintView();
  }, []);

  return <div id="print-view" />;
}

async function renderPrintView() {
  const app = document.querySelector<HTMLElement>('#root article');
  const renderTo = document.querySelector<HTMLElement>('#print-view');
  return render(app!, renderTo!);

  // const chunks = await render(app!, renderTo!);
  // console.log(`took: ${(chunks.performance / 1000).toFixed(2)}s`);
  // return chunks
}
