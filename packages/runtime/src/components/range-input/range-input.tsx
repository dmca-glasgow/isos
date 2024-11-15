import classNames from 'classnames';

import { Readability } from '../../constants/readability';

import './range-input.scss';

type Props = Readability & {
  value: number;
  onChange: (value: number) => unknown;
};

export function RangeInput(props: Props) {
  const name = props.label.toLowerCase();
  return (
    <div className="range-input">
      <label for={name}>{props.label}</label>
      <input
        type="range"
        id={name}
        name={name}
        min={props.min}
        max={props.max}
        step={props.increment}
        value={props.value}
        defaultValue={String(props.defaultValue)}
        onChange={(e) => {
          props.onChange(Number(e.currentTarget.value));
        }}
      />
      <button
        className={classNames({
          disabled: props.value === props.defaultValue,
        })}
        onClick={(e) => {
          e.preventDefault();
          props.onChange(props.defaultValue);
        }}>
        Reset
      </button>
    </div>
  );
}
