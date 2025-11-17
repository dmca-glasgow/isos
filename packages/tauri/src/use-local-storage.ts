import { useCallback, useState } from 'preact/hooks';

type UseLocalStorage = [string, (updatedValue: string) => unknown];

export function useLocalStorage(
  key: string,
  defaultValue: string,
): UseLocalStorage {
  const cached = localStorage.getItem(key);
  const [value, setValue] = useState(cached || defaultValue || '');

  const handleUpdate = useCallback(
    (updatedValue: string) => {
      setValue(updatedValue || '');
      localStorage.setItem(key, updatedValue || '');
    },
    [key],
  );

  return [value, handleUpdate];
}
