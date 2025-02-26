import { ComponentChildren, createContext } from 'preact';
import { useMemo, useState } from 'preact/hooks';

type Section = {
  id: string;
  height: number;
};

const initialSection: Section = { id: '', height: Infinity };

type TocHighlight = {
  activeSectionId: string;
  setActiveSection: (inView: boolean, section: Section) => unknown;
};

export const TocHighlightContext = createContext<TocHighlight>({
  activeSectionId: initialSection.id,
  setActiveSection: () => {},
});

export function TocHighlightProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [activeSections, setActiveSection] = useState<Section[]>([]);

  const context = useMemo((): TocHighlight => {
    return {
      activeSectionId: getShortestSection(activeSections).id,
      setActiveSection(inView: boolean, section: Section) {
        setActiveSection((activeSections) => {
          if (inView && !activeSections.find((o) => o.id === section.id)) {
            return [...activeSections, section];
          }
          if (!inView && activeSections.find((o) => o.id === section.id)) {
            return activeSections.filter((o) => o.id !== section.id);
          }
          return activeSections;
        });
      },
    };
  }, [activeSections]);

  return (
    <TocHighlightContext.Provider value={context}>
      {children}
    </TocHighlightContext.Provider>
  );
}

function getShortestSection(activeSections: Section[]) {
  return activeSections.reduce((acc: Section, section: Section) => {
    return section.height <= acc.height ? section : acc;
  }, initialSection);
}
