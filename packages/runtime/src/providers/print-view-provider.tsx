import { ComponentChildren, createContext } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

import { useLocalStorage } from '@isos/use-local-storage';

type PrintView = {
  showPages: boolean;
  loading: boolean;
  double: boolean;
  setShowPages: (showPages: boolean) => unknown;
  setLoading: (loading: boolean) => unknown;
  setDouble: (double: boolean) => unknown;
  setScale: (scale: number) => unknown;
};

export const PrintViewContext = createContext<PrintView>({
  showPages: false,
  loading: true,
  double: false,
  setShowPages: () => {},
  setLoading: () => {},
  setDouble: () => {},
  setScale: () => {},
});

export function PrintViewProvider({
  children,
  element = document.documentElement,
}: {
  children: ComponentChildren;
  element?: HTMLElement;
}) {
  const [showPages, setShowPages] = useLocalStorage('show-pages', 'false');
  const [loading, setLoading] = useState(true);
  const [double, setDouble] = useState(false);

  // on load
  useEffect(() => {
    if (showPages === 'true') {
      element.classList.add('view-pages');
    } else {
      element.classList.remove('view-pages');
    }
    element.style.setProperty('--pages-scale', String(1));
  }, []);

  const context = useMemo(
    (): PrintView => ({
      showPages: showPages === 'true',
      loading,
      double,
      setShowPages(showPages: boolean) {
        setShowPages(String(showPages));
        if (showPages) {
          element.classList.add('view-pages');
        } else {
          element.classList.remove('view-pages');
        }
      },
      setLoading,
      setDouble,
      setScale(newScale: number) {
        const clamped = Math.min(newScale, 1);
        element.style.setProperty('--pages-scale', String(clamped));
      },
    }),
    [showPages, loading, double],
  );

  return (
    <PrintViewContext.Provider value={context}>
      {children}
    </PrintViewContext.Provider>
  );
}
