// import { ComponentChildren, createContext } from 'preact';
// import { useEffect, useMemo } from 'preact/hooks';

// import { useLocalStorage } from '@isos/use-local-storage';

// export enum Views {
//   web = 'web',
//   print = 'print',
// }

// type View = {
//   view: Views;
//   setView: (view: Views) => unknown;
// };

// export const ViewContext = createContext<View>({
//   view: Views.web,
//   setView: () => {},
// });

// export function ViewProvider({
//   children,
//   elem = document.documentElement,
// }: {
//   children: ComponentChildren;
//   elem?: HTMLElement;
// }) {
//   const [view, setView] = useLocalStorage('view', Views.web);

//   useEffect(() => {
//     elem.classList.add(`view-${view}`);
//   }, []);

//   const context = useMemo((): View => {
//     return {
//       view: view as Views,
//       setView(newView) {
//         // console.log('hey!');
//         elem.classList.replace(`view-${view}`, `view-${newView}`);
//         setView(newView);
//       },
//     };
//   }, [view]);

//   return (
//     <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
//   );
// }
