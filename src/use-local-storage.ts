// import { useEffect, useState, useCallback } from 'preact/hooks';

// const evtTarget = new EventTarget();

// type UseLocalStorage = [
//   string | null,
//   (updatedValue: string | null) => unknown
// ];

// export function useLocalStorage(
//   key: string,
//   defaultValue: string | null = ''
// ): UseLocalStorage {
//   const cached = localStorage.getItem(key);
//   const [value, setValue] = useState(defaultValue || cached || '');

//   const handleUpdate = useCallback(
//     (updatedValue: string | null) => {
//       setValue(updatedValue || '');
//       localStorage.setItem(key, updatedValue || '');
//       evtTarget.dispatchEvent(
//         new CustomEvent('storage_change', { detail: { key } })
//       );
//     },
//     [key]
//   );

//   useEffect(() => {
//     if (defaultValue) {
//       handleUpdate(defaultValue);
//     }
//   }, [handleUpdate, defaultValue]);

//   useEffect(() => {
//     function listener({ detail }: CustomEvent) {
//       if (detail.key === key) {
//         const toCache = localStorage.getItem(key);
//         if (toCache !== cached) {
//           setValue(toCache || '');
//         }
//       }
//     }
//     evtTarget.addEventListener(
//       'storage_change',
//       listener as EventListener
//     );
//     return () => {
//       evtTarget.removeEventListener(
//         'storage_change',
//         listener as EventListener
//       );
//     };
//   });

//   return [value || null, handleUpdate];
// }
