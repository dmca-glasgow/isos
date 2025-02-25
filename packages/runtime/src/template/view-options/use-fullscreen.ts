import fullscreen from 'fscreen';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

export interface FullScreenHandle {
  active: boolean;
  enter: () => void;
  exit: () => void;
}

export function useFullScreenHandle(el: HTMLElement): FullScreenHandle {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    function onChange() {
      setActive(fullscreen.fullscreenElement === el);
    }
    fullscreen.addEventListener('fullscreenchange', onChange);
    return () =>
      fullscreen.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(() => {
    fullscreen.requestFullscreen(el);
  }, []);

  const exit = useCallback(() => {
    fullscreen.exitFullscreen();
  }, []);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
    }),
    [active, enter, exit],
  );
}
