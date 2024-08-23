import { ComponentChildren, createContext } from 'preact';
import { useMemo, useState } from 'preact/hooks';

type Error = {
  error: string;
  setError: (error: string) => unknown;
};

export const ErrorContext = createContext<Error>({
  error: '',
  setError: () => {},
});

export function ErrorProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [error, setError] = useState('');

  const context = useMemo((): Error => {
    return {
      error,
      setError,
    };
  }, [error, setError]);

  return (
    <ErrorContext.Provider value={context}>
      {children}
    </ErrorContext.Provider>
  );
}
