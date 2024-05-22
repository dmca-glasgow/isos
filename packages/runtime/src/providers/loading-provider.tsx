import { createContext, ComponentChildren } from 'preact';
import { useState, useMemo } from 'preact/hooks';

type Loading = {
  loading: boolean;
  setLoading: (loading: boolean) => unknown;
};

export const LoadingContext = createContext<Loading>({
  loading: true,
  setLoading: () => {},
});

export function LoadingProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [loading, setLoading] = useState(true);

  const context = useMemo((): Loading => {
    return {
      loading,
      setLoading,
    };
  }, [loading, setLoading]);

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  );
}
