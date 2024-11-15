import { useEffect, useState } from 'preact/hooks';

import { Article } from './article';
import { PrintView } from './print-view';

type Props = {
  jsString: string;
  onHtmlRendered?: () => unknown;
  onPagesRendered?: () => unknown;
};

export function ViewSwitcher({
  jsString,
  onHtmlRendered,
  onPagesRendered,
}: Props) {
  const [htmlRendered, setHtmlRendered] = useState(false);

  useEffect(() => {
    setHtmlRendered(false);
  }, [jsString]);

  function handleHtmlRendered() {
    setHtmlRendered(true);
    onHtmlRendered && onHtmlRendered();
  }

  return (
    <>
      <div id="article-wrapper">
        <Article jsString={jsString} onRendered={handleHtmlRendered} />
      </div>
      {htmlRendered && <PrintView onRendered={onPagesRendered} />}
    </>
  );
}
