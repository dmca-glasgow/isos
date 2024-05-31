import { useCallback, useEffect, useState } from 'preact/hooks';

const evtTarget = new EventTarget();

type UseLocalStorage = [string, (updatedValue: string) => unknown];

export function useLocalStorage(
  key: string,
  defaultValue: string
): UseLocalStorage {
  const cached = localStorage.getItem(key);
  const [value, setValue] = useState(cached || defaultValue || '');

  const handleUpdate = useCallback(
    (updatedValue: string) => {
      setValue(updatedValue || '');
      localStorage.setItem(key, updatedValue || '');
      evtTarget.dispatchEvent(
        new CustomEvent('storage_change', { detail: { key } })
      );
    },
    [key]
  );

  useEffect(() => {
    function listener({ detail }: CustomEvent) {
      if (detail.key === key) {
        const toCache = localStorage.getItem(key);
        if (toCache !== cached) {
          setValue(toCache || '');
        }
      }
    }
    evtTarget.addEventListener(
      'storage_change',
      listener as EventListener
    );
    return () => {
      evtTarget.removeEventListener(
        'storage_change',
        listener as EventListener
      );
    };
  });

  return [value, handleUpdate];
}
