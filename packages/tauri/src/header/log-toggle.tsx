import { useState } from 'preact/hooks';

import { rootEl } from '../constants';

export function LogToggle() {
  const [_active, setActive] = useState(false);

  function onToggle() {
    setActive((prev) => {
      if (prev) {
        rootEl.classList.remove('log-show');
        return false;
      } else {
        rootEl.classList.add('log-show');
        return true;
      }
    });
  }

  return (
    <span className="log-toggle">
      <svg viewBox="0 0 24 24" onClick={onToggle}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    </span>
  );
}
