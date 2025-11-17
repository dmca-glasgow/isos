import { useEffect, useState } from 'preact/hooks';

type Props = {
  loading: boolean;
};

export function WarningLineHighlight({ loading }: Props) {
  const [warnings, setWarnings] = useState<number[]>([]);
  const [articleHeight, setArticleHeight] = useState(0);
  // const { height, ref } = useElementDimensions();
  // console.log({ loading, warnings });

  useEffect(() => {
    function addWarning(e: CustomEventInit<number>) {
      // console.log('listening');
      if (e.detail !== undefined) {
        // @ts-expect-error
        setWarnings((prev) => {
          // @ts-expect-error
          return prev.includes(e.detail) ? prev : [...prev, e.detail];
        });
      }
    }

    function removeWarning(e: CustomEventInit<number>) {
      if (e.detail !== undefined) {
        setWarnings((prev) => {
          // @ts-expect-error
          return prev.includes(e.detail)
            ? prev.filter((n) => n !== e.detail)
            : prev;
        });
      }
    }

    window.addEventListener('warning', addWarning);
    window.addEventListener('warning-remove', removeWarning);
    return () => {
      console.log('dismount');
      window.removeEventListener('warning', addWarning);
      window.removeEventListener('warning-remove', removeWarning);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setWarnings([]);
    } else {
      const article = document.querySelector('article');
      if (article) {
        const rect = article.getBoundingClientRect();
        setArticleHeight(rect.height);
      }
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <div id="warnings">
      {warnings.map((top, idx) => (
        <div
          key={idx}
          className="warning"
          style={{ top: `${100 / (articleHeight / top)}%` }}
        />
      ))}
    </div>
  );
}

// function useElementDimensions() {
//   const ref = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState(0);

//   const refresh = useCallback(() => {
//     const domRect = ref.current?.getBoundingClientRect();

//     if (domRect) {
//       setHeight(domRect.height);
//     }
//   }, []);

//   useEventListener('resize', refresh);
//   // useEventListener('scroll', refresh, true);

//   return { height, ref, refresh };
// }

// function useEventListener(
//   event: string,
//   listener: () => void,
//   useCapture?: boolean,
// ) {
//   useEffect(() => {
//     listener();
//     window.addEventListener(event, listener, useCapture);
//     return () => {
//       window.removeEventListener(event, listener, useCapture);
//     };
//   }, [event, listener, useCapture]);
// }
