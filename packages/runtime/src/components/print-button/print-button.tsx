import { Print } from '../icons';
import classNames from 'classnames';
import { useContext } from 'preact/hooks';

// import { Readability } from '../../constants/readability';
import { ViewContext } from '../../providers/view-provider';

import './print-button.scss';

// const scaleObj: Readability = {
//   name: 'scale',
//   min: 0.5,
//   max: 1,
//   increment: 0.01,
//   defaultValue: 1,
// };

export function PrintButton() {
  const { showPages, setShowPages, loading } = useContext(ViewContext);

  function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      setShowPages(e.target.checked);
    }
  }

  return (
    <>
      <div id="print-btn" className={classNames({ loading })}>
        <Print />
        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={showPages}
          />
          <span>Enable pages view</span>
        </label>
        <div className="spinner" />
      </div>
      {/* {showPages && (
        <div id="print-zoom">
          <input
            type="range"
            id={scaleObj.name}
            name={scaleObj.name}
            min={scaleObj.min}
            max={scaleObj.max}
            step={scaleObj.increment}
            value={scale}
            defaultValue={String(scaleObj.defaultValue)}
            onChange={(e) => {
              setScale(Number(e.currentTarget.value));
            }}
          />
        </div>
      )} */}
    </>
  );
}
