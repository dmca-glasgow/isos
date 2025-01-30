// import classNames from 'classnames';
// import { useContext, useEffect } from 'preact/hooks';
import { useContext } from 'preact/hooks';

import { render } from '@isos/paged';

import { PrintViewContext } from './providers/print-view-provider';

// import { PrintViewContext } from './providers/print-view-provider';

// export function PrintView() {
//   const { double, setScale, setDouble, setLoading } =
//     useContext(PrintViewContext);

//   useEffect(() => {
//     (async () => {
//       const app = document.querySelector<HTMLElement>('#root article');
//       const renderTo = document.querySelector(
//         '#print-view > .pages',
//       ) as HTMLElement;
//       const promise = render(app!, renderTo!);
//       handleResize(setScale, setDouble);
//       await promise;
//       setLoading(false);
//     })();

//     return () => {};
//   }, []);

//   return (
//     <div id="print-view" className={classNames({ double })}>
//       <div className="pages"></div>
//     </div>
//   );
// }

export async function onHtmlLoaded() {
  const { setScale, setDouble, setLoading } = useContext(PrintViewContext);
  const app = document.querySelector<HTMLElement>('#root article');
  const renderTo = document.querySelector<HTMLElement>(
    '#print-view > .pages',
  );
  const promise = render(app!, renderTo!);
  handleResize(setScale, setDouble);
  await promise;
  setLoading(false);
}

async function handleResize(
  setScale: (scale: number) => unknown,
  setDouble: (double: boolean) => unknown,
) {
  const container = document.querySelector('#print-view') as HTMLElement;
  const pages = container.querySelector('.pagedjs_pages') as HTMLElement;
  const firstPage = await waitForFirstPage(pages);
  const firstPageBox = firstPage.getBoundingClientRect();

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const containerBox = entry.contentRect;
      const widthScale = (containerBox.width * 0.8) / firstPageBox.width;
      setScale(widthScale);
      setDouble(widthScale > 2);
    }
  });

  resizeObserver.observe(container);
}

async function waitForFirstPage(
  container: HTMLElement,
): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutationList) => {
      resolve(mutationList[0].addedNodes[0] as HTMLElement);
    });
    observer.observe(container, { childList: true });
  });
}
