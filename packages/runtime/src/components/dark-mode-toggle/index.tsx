// import './styles.scss';
import { Moon, Sun } from '../icons';
import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../../providers/view-options-provider';

export function DarkModeToggle() {
  const { theme, setTheme } = useContext(ViewOptionsContext);

  function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.checked) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }

  return (
    <div id="dark-theme-toggle">
      <div class="sun">
        <Sun />
      </div>
      <div class="moon">
        <Moon />
      </div>
      <label>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={theme === 'dark'}
        />
        <span>Enable dark mode</span>
      </label>
    </div>
  );
}
