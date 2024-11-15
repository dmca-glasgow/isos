import CrestSvg from '../assets/crest.svg';
import UofGSvg from '../assets/uofg.svg';

import './logo.scss';

export function Logo() {
  return (
    <div className="logo">
      <div className="wrapper">
        <CrestSvg className="crest" />
        <UofGSvg className="u-of-g" />
      </div>
    </div>
  );
}
